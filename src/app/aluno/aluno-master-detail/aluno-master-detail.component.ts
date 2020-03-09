import { appRoutes } from './../../commons';
import { Aluno, Turma } from './../../models';
import { ExceptionHandlerService } from 'src/app/exception-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoDataService } from './../aluno-data.service';
import { Component, OnInit} from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



@Component({
  selector: 'app-aluno-master-detail',
  templateUrl: './aluno-master-detail.component.html',
  styleUrls: ['./aluno-master-detail.component.scss']
})
export class AlunoMasterDetailComponent implements OnInit {

  private turmaId: number;

  alunoTwoWayBinded = new Aluno();

  //Table
  displayedColumns: string[] = ['id', 'nome', 'quantidadeDeFaltas', 'mediaDeNotas'];

  public turma: Turma = new Turma();

  //Card
  enableAlunoCard = false;

  constructor(
    private service: AlunoDataService,
    private route: ActivatedRoute,
    private router: Router,
    private exceptionHandlerService: ExceptionHandlerService,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.turmaId = this.route.snapshot.params['id'];
    this.loadAlunosFromApi();
  }

  rowClicked(row: any){
    this.setEnableAlunoCard();
    this.alunoTwoWayBinded = this.turma.alunos.filter((aluno) => {
      return aluno.id === row.id;
    })[0];
  }
  
  loadAlunosFromApi(){

    this.apollo.query({
      query: gql`{
        turma(id: ${this.turmaId}){
          titulo
          alunos {
            id
            nome
            quantidadeDeFaltas
            mediaDeNotas
          }
        }
      }`
    }).subscribe((resp: any) => {
      this.turma = resp.data.turma as Turma;
    });

  }

  openCardToCreate(){
    this.setEnableAlunoCard();
    this.alunoTwoWayBinded = new Aluno();
  }

  comeBack(){
    this.router.navigateByUrl(appRoutes.turma);
  }

  private setEnableAlunoCard(){
    if(!this.enableAlunoCard){
      this.enableAlunoCard = true;
    }
  }

}
