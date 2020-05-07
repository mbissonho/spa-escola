import { Aluno } from './../../models';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { AlunoDataService } from './../aluno-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogTemplateComponent } from './../../shared/dialog-template/dialog-template.component';
import { detailCardStates } from './../../commons';
import { Component, Input, Output, OnChanges } from '@angular/core';
import { ExceptionHandlerService } from 'src/app/exception-handler.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-aluno-detail',
  templateUrl: './aluno-detail.component.html',
  styleUrls: ['./aluno-detail.component.scss']
})
export class AlunoDetailComponent implements OnChanges {

  private turmaId;

  @Input() aluno = new Aluno();
  @Output() alunoDetailEvent: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  cardState = detailCardStates.ON_CREATE;

  constructor(
    private formBuilder: FormBuilder,
    private service: AlunoDataService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private exceptionHandlerService: ExceptionHandlerService
  ) { 
    this.turmaId = this.route.snapshot.params['id'];
    this.configForm();
  }

  ngOnChanges(){
    if(this.aluno.id){
      this.setOnViewUpdateState();
    } else {
      this.setOnCreateState();
    }
  }

  private configForm(){
    this.form = this.formBuilder.group({
      id: [],
      nome: [null, [Validators.required, Validators.maxLength(49)]],
      quantidadeDeFaltas: [null, [Validators.required, Validators.maxLength(2), Validators.pattern('[0-9]*')]],
      mediaDeNotas: [null,[ Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]+([\.][0-9]+)?$')]],
      turma: this.formBuilder.group({
        id: [ null, Validators.required ]
      })
    });
  }

  save(){
    this.service.save(this.aluno)
    .then((aluno: Aluno) => {
      this.messageService.doMessage(`Aluno(a) ${aluno.nome} criado(a) com sucesso`);
      this.alunoDetailEvent.emit('resourceChanged');
      this.setOnCreateState();
    }).catch((response: any) => { 
      this.exceptionHandlerService.handle(response.error);
    });
  }

  update(){
    this.service.update(this.aluno)
    .then((aluno: Aluno) => {
      this.messageService.doMessage(`Aluno(a) ${aluno.nome} atualizado(a) com sucesso`);
      this.alunoDetailEvent.emit('resourceChanged');
      this.setOnCreateState();
    }).catch((response: any) => { 
      this.exceptionHandlerService.handle(response.error);
    });
  }

  delete(){
    const dialogRef = this.dialog.open(DialogTemplateComponent, { width: '300px', data : 'Confirma a exclusão deste aluno?'});
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
      this.alunoDetailEvent.emit('resourceChanged');
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

  private setOnViewUpdateState(){
    this.cardState = detailCardStates.ON_VIEW_UPDATE;
    this.form.patchValue(this.aluno);
    this.setFormTurmaId();
  }

  private setOnCreateState(){
    this.form.reset();
    this.cardState = detailCardStates.ON_CREATE;
    this.setFormTurmaId();
  }

  private setFormTurmaId(){
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
