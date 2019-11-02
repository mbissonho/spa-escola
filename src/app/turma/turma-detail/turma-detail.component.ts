import { Router } from '@angular/router';
import { detailCardStates } from './../../commons';
import { DialogTemplateComponent } from './../../shared/dialog-template/dialog-template.component';
import { Turma } from './../turma-master-detail/turma-master-detail.component';
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
    private router: Router
  ) { }

  ngOnInit() {
    this.configForm();
    this.updateTurmaObject(this.turma);
  }

  private configForm(){
    this.form = this.formBuilder.group({
      id: [],
      nomeDoProfessor: [null, Validators.required],
      serie: [null, Validators.required],
      titulo: [null, Validators.required],
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
    }).catch(() => {

    });
  }

  update(){
    this.service.update(this.turma)
    .then((turma: Turma) => {
      this.messageService.doMessage(`Turma ${turma.titulo} atualizada com sucesso`);
      this.emitter.emit('resourceChanged');
    }).catch(() => {

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
    })
    .catch(() => {

    });
  }

  submitForm(){
    this.turma = this.form.value;
    if(this.cardState === detailCardStates.ON_CREATE){
      this.save();
    } else {
      this.update();
    }
    this.setOnCreateState();
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
