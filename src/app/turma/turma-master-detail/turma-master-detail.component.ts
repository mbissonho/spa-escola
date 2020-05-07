import { ExceptionHandlerService } from './../../exception-handler.service';
import { Turma } from './../../models';
import { TurmaDataService } from './../turma-data.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-turma-master-detail',
  templateUrl: './turma-master-detail.component.html',
  styleUrls: ['./turma-master-detail.component.scss']
})
export class TurmaMasterDetailComponent implements OnInit {

  isLoading = true;

  turmaTwoWayBindedParent = new Turma();

  //Table
  displayedColumns: string[] = ['id', 'nomeDoProfessor', 'serie', 'titulo', 'quantidadeDeAlunos'];
  public dataSource: Turma[];

  //Card
  enableTurmaCard = false;

  constructor(
    private service: TurmaDataService,
    private exceptionHandlerService: ExceptionHandlerService
  ) {}

  ngOnInit() {
    this.loadTurmasFromApi();
  }

  loadTurmasFromApi(){

    this.isLoading = true;

    this.service.load()
    .then((data: any) => {
      this.dataSource = data;
      this.isLoading = false;
    })
    .catch((response) => {
      this.exceptionHandlerService.handle(response.error);
    });
  }

  rowClicked(row: any){
    this.setEnableTurmaCard();
    this.turmaTwoWayBindedParent = row as Turma;
  }

  openCardToCreate(){
    this.setEnableTurmaCard();
    this.turmaTwoWayBindedParent = new Turma();
  }

  private setEnableTurmaCard(){
    if(!this.enableTurmaCard){
      this.enableTurmaCard = true;
    }
  }

}
