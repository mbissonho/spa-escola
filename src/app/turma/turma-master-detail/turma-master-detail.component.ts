import { Turma } from './../../models';
import { TurmaDetailComponent } from './../turma-detail/turma-detail.component';
import { TurmaDataService } from './../turma-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-turma-master-detail',
  templateUrl: './turma-master-detail.component.html',
  styleUrls: ['./turma-master-detail.component.scss']
})
export class TurmaMasterDetailComponent implements OnInit {

  @ViewChild('card', { static: false}) card: TurmaDetailComponent;

  turmaToViewOrUpdate = new Turma();

  //Table
  displayedColumns: string[] = ['id', 'nomeDoProfessor', 'serie', 'titulo', 'quantidadeDeAlunos'];
  public dataSource: Turma[];

  //Card
  enableTurmaCard = false;

  constructor(
    private service: TurmaDataService
  ) {}

  ngOnInit() {
    this.loadTurmas();
  }

  rowClicked(row: any){

    this.turmaToViewOrUpdate = this.dataSource.filter((turma) => {
      return turma.id === row.id;
    })[0];

    if (this.card) {
      this.card.updateTurmaObject(this.turmaToViewOrUpdate);
    }

    this.enableTurmaCard = true;
  }

  loadTurmas(){
    this.service.load()
    .then((data: any) => {
      this.dataSource = data;
    })
    .catch(() => {
      alert('Erro!');
    });
  }

  openCardToCreate(){
    this.enableTurmaCard = true;
    if(this.card) {
      this.card.form.reset();
      this.card.setOnCreateState();
    }
  }

}
