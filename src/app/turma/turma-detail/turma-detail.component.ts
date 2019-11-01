import { DialogTemplateComponent } from './../../shared/dialog-template/dialog-template.component';
import { Turma } from './../turma-master-detail/turma-master-detail.component';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TurmaDataService } from '../turma-data.service';
import { MessageService } from 'src/app/message.service';
import { MatDialog } from '@angular/material/dialog';

enum cardStates {
  ON_CREATE = 1,
  ON_VIEW_UPDATE = 2
}

@Component({
  selector: 'app-turma-detail',
  templateUrl: './turma-detail.component.html',
  styleUrls: ['./turma-detail.component.scss']
})

export class TurmaDetailComponent implements OnInit {

  @Input() turma = new Turma();

  form: FormGroup;
  cardState = cardStates.ON_CREATE;

  constructor(
    private formBuilder: FormBuilder,
    private service: TurmaDataService,
    private messageService: MessageService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.configForm();
    this.updateTurmaObject(this.turma);
  }

  configForm(){
    this.form = this.formBuilder.group({
      id: [],
      nomeDoProfessor: [null, Validators.required],
      serie: [null, Validators.required],
      titulo: [null, Validators.required]
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
    }).catch(() => {

    });
  }

  update(){
    this.service.update(this.turma)
    .then((turma: Turma) => {
      this.messageService.doMessage(`Turma ${turma.titulo} atualizada com sucesso`);
    }).catch(() => {

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
    this.service.delete(this.turma.id)
    .then(() => {
      this.messageService.doMessage(`Turma ${this.turma.titulo} excluída com sucesso`);
      this.form.reset();
      this.setOnCreateState();
    })
    .catch(() => {

    });
  }

  submitForm(){
    this.turma.serie = this.form.get('serie').value;
    this.turma.titulo = this.form.get('titulo').value;
    if(this.cardState === cardStates.ON_CREATE){
      this.save();
    } else {
      this.update();
    }
    this.form.reset();
  }

  setOnViewUpdateState(){
    this.cardState = cardStates.ON_VIEW_UPDATE;
  }

  setOnCreateState(){
    this.cardState = cardStates.ON_CREATE;
  }

  toggleCardHeaderLabel(){
    return this.cardState === cardStates.ON_VIEW_UPDATE ? 'Em edição' : 'Nova turma';
  }

  toggleSaveButtonLabel(){
    return this.cardState === cardStates.ON_VIEW_UPDATE ? 'ATUALIZAR' : 'SALVAR';
  }

  enableExcluirButton() {
    return this.cardState === cardStates.ON_VIEW_UPDATE ? true : false;
  }

  enableVerAlunosButton(){
    return this.cardState === cardStates.ON_VIEW_UPDATE && this.turma.alunos.length ? true : false;
  }

}
