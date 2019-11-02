import { Aluno } from './../../models';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { AlunoDataService } from './../aluno-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogTemplateComponent } from './../../shared/dialog-template/dialog-template.component';
import { detailCardStates } from './../../commons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExceptionHandlerService } from 'src/app/exception-handler.service';

@Component({
  selector: 'app-aluno-detail',
  templateUrl: './aluno-detail.component.html',
  styleUrls: ['./aluno-detail.component.scss']
})
export class AlunoDetailComponent implements OnInit {

  private turmaId;

  @Input() aluno = new Aluno();

  @Output() emitter: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  cardState = detailCardStates.ON_CREATE;

  constructor(
    private formBuilder: FormBuilder,
    private service: AlunoDataService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private exceptionHandlerService: ExceptionHandlerService
  ) { }

  ngOnInit() {
    this.turmaId = this.route.snapshot.params['id'];
    this.configForm();
    this.updateAlunoObject(this.aluno);
  }

  private configForm(){
    this.form = this.formBuilder.group({
      id: [],
      nome: [null, Validators.required],
      quantidadeDeFaltas: [null, [Validators.required, Validators.maxLength(2)]],
      mediaDeNotas: [null,[ Validators.required, Validators.maxLength(3), Validators.pattern('[0-9]\\.[0-9]')]],
      turma: this.formBuilder.group({
        id: [ null, Validators.required ]
      })
    });
  }

  updateAlunoObject(aluno: Aluno){
    this.aluno = aluno;
    this.form.patchValue(aluno);
    if(this.aluno.id){
      this.setOnViewUpdateState();
    } else {
      this.setOnCreateState();
    }
  }

  save(){
    this.service.save(this.aluno)
    .then((aluno: Aluno) => {
      this.messageService.doMessage(`Aluno(a) ${aluno.nome} criado(a) com sucesso`);
      this.emitter.emit('resourceChanged');
      this.setOnCreateState();
    }).catch((response: any) => { 
      this.exceptionHandlerService.handle(response.error);
    });
  }

  update(){
    this.service.update(this.aluno)
    .then((aluno: Aluno) => {
      this.messageService.doMessage(`Aluno(a) ${aluno.nome} atualizado(a) com sucesso`);
      this.emitter.emit('resourceChanged');
      this.setOnCreateState();
    }).catch((response: any) => { 
      this.exceptionHandlerService.handle(response.error);
    });
  }

  delete(){
    const dialogRef = this.dialog.open(DialogTemplateComponent, { width: '300px'});
    dialogRef.afterClosed().subscribe((shouldDelete) => {
      if(shouldDelete){
        this.confirmDelete();
      }
    });
  }

  confirmDelete(){
    this.service.delete(this.aluno.id)
    .then(() => {
      this.messageService.doMessage(`Aluno(a) ${this.aluno.nome} excluído(a) com sucesso`);
      this.emitter.emit('resourceChanged');
      this.setOnCreateState();
    })
    .catch((response: any) => { 
      this.exceptionHandlerService.handle(response.error);
    });
  }

  submitForm(){
    this.aluno = this.form.value;
    if(this.cardState === detailCardStates.ON_CREATE){
      this.save();
    } else {
      this.update();
    }
  }

  setOnViewUpdateState(){
    this.cardState = detailCardStates.ON_VIEW_UPDATE;
    this.form.get('turma').get('id').setValue(this.turmaId);
  }

  setOnCreateState(){
    this.form.reset();
    this.aluno = new Aluno();
    this.cardState = detailCardStates.ON_CREATE;
    this.form.get('turma').get('id').setValue(this.turmaId);
  }

  toggleCardHeaderLabel(){
    return this.cardState === detailCardStates.ON_VIEW_UPDATE ? 'Em edição' : 'Novo(a) aluno(a)';
  }

  toggleSaveButtonLabel(){
    return this.cardState === detailCardStates.ON_VIEW_UPDATE ? 'ATUALIZAR' : 'SALVAR';
  }

  enableExcluirButton() {
    return this.cardState === detailCardStates.ON_VIEW_UPDATE ? true : false;
  }

  enableAlunosButton(){
    return this.cardState === detailCardStates.ON_VIEW_UPDATE ? true : false;
  }

}
