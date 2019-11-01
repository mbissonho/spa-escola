import { Turma } from './../turma-master-detail/turma-master-detail.component';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TurmaDataService } from '../turma-data.service';

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
  cardHeaderLabel = 'Nova turma';

  hasAlunos: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: TurmaDataService
  ) { }

  ngOnInit() {
    this.configForm();
    this.updateTurmaObject(this.turma);
  }

  configForm(){
    this.form = this.formBuilder.group({
      id: [],
      serie: [null, Validators.required],
      titulo: [null, Validators.required]
    });
  }

  updateTurmaObject(turma: Turma){
    this.form.patchValue(turma);
    if(this.turma.id){
      this.setOnViewUpdateState();
    } else {
      this.setOnCreateState();
    }
  }

  save(){
    this.service.save();
  }

  update(){

  }

  submitForm(){
    if(this.cardState === cardStates.ON_CREATE){
      this.save();
    } else {
      this.update();
    }
  }

  setOnViewUpdateState(){
    this.cardState = cardStates.ON_VIEW_UPDATE;
  }

  setOnCreateState(){
    this.cardState = cardStates.ON_CREATE;
  }

  toggleSaveButtonLabel(){
    return this.cardState === cardStates.ON_VIEW_UPDATE ? 'ATUALIZAR' : 'SALVAR';
  }

  enableVerAlunosButton(){
    return this.cardState === cardStates.ON_VIEW_UPDATE && this.turma.alunos.length ? true : false;
  }

}
