import { Turma } from './../../models';
import { ExceptionHandlerService } from 'src/app/exception-handler.service';
import { Router } from '@angular/router';
import { detailCardStates } from './../../commons';
import { DialogTemplateComponent } from './../../shared/dialog-template/dialog-template.component';
import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TurmaDataService } from '../turma-data.service';
import { MessageService } from 'src/app/message.service';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-turma-detail',
  templateUrl: './turma-detail.component.html',
  styleUrls: ['./turma-detail.component.scss']
})

export class TurmaDetailComponent implements OnInit {

  @Input() turma = new Turma();

  @Output() emitter: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  cardState = detailCardStates.ON_CREATE;

  constructor(
    private formBuilder: FormBuilder,
    private service: TurmaDataService,
    private messageService: MessageService,
    public dialog: MatDialog,
    private router: Router,
    private exceptionHandlerService: ExceptionHandlerService
  ) { }

  ngOnInit() {
    this.configForm();
    this.updateTurmaObject(this.turma);
  }

  private configForm(){
    this.form = this.formBuilder.group({
      id: [],
      nomeDoProfessor: [null, [Validators.required, Validators.maxLength(49)]],
      serie: [null, [Validators.required, Validators.maxLength(1), Validators.pattern('[1-8]')]],
      titulo: [null, [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern('^[0-9]*$')]],
      quantidadeDeAlunos: [null, null]
    });
  }

  updateTurmaObject(turma: Turma){
    this.turma = turma;
    this.form.patchValue(turma);
    if(this.turma.id){
      this.setOnViewUpdateState();
    } else {
      this.setOnCreateState();
    }
  }

  save(){
    this.service.save(this.turma)
    .then((turma: Turma) => {
      this.messageService.doMessage(`Turma ${turma.titulo} criada com sucesso`);
      this.emitter.emit('resourceChanged');
      this.setOnCreateState();
    }).catch((response: any) => { 
      this.exceptionHandlerService.handle(response.error);
    });
  }

  update(){
    this.service.update(this.turma)
    .then((turma: Turma) => {
      this.messageService.doMessage(`Turma ${turma.titulo} atualizada com sucesso`);
      this.emitter.emit('resourceChanged');
      this.setOnCreateState();
    }).catch((response: any) => { 
      this.exceptionHandlerService.handle(response.error);
    });
  }

  delete(){
    const dialogRef = this.dialog.open(DialogTemplateComponent, 
      { data: 'Confirma a exclusão da turma e todos seus alunos?',  width: '300px'});
    dialogRef.afterClosed().subscribe((shouldDelete) => {
      if(shouldDelete){
        this.confirmDelete();
      }
    });
  }

  confirmDelete(){
    this.service.delete(this.turma.id)
    .then(() => {
      this.messageService.doMessage(`Turma ${this.turma.titulo} excluída com sucesso`);
      this.setOnCreateState();
      this.emitter.emit('resourceChanged');
    }).catch((response: any) => { 
      this.exceptionHandlerService.handle(response.error);
    });
  }

  submitForm(){
    this.turma = this.form.value;
    if(this.cardState === detailCardStates.ON_CREATE){
      this.save();
    } else {
      this.update();
    }
  }

  viewAlunos(){
    this.router.navigateByUrl('/alunos/' + this.turma.id);
  }

  setOnViewUpdateState(){
    this.cardState = detailCardStates.ON_VIEW_UPDATE;
  }

  setOnCreateState(){
    this.form.reset();
    this.turma = new Turma();
    this.cardState = detailCardStates.ON_CREATE;
  }

  toggleCardHeaderLabel(){
    return this.cardState === detailCardStates.ON_VIEW_UPDATE ? 'Em edição' : 'Nova turma';
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
