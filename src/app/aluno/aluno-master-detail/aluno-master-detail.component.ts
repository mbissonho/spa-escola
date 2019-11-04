import { appRoutes } from './../../commons';
import { Aluno } from './../../models';
import { ExceptionHandlerService } from 'src/app/exception-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoDataService } from './../aluno-data.service';
import { Component, OnInit} from '@angular/core';



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
  
  public dataSource: Aluno[];

  //Card
  enableAlunoCard = false;

  constructor(
    private service: AlunoDataService,
    private route: ActivatedRoute,
    private router: Router,
    private exceptionHandlerService: ExceptionHandlerService
  ) {}

  ngOnInit() {
    this.turmaId = this.route.snapshot.params['id'];
    this.loadAlunosFromApi();
  }

  rowClicked(row: any){
    this.setEnableAlunoCard();
    this.alunoTwoWayBinded = this.dataSource.filter((aluno) => {
      return aluno.id === row.id;
    })[0];
  }

  loadAlunosFromApi(){
    this.service.loadByTurma(this.turmaId)
    .then((data: any) => {
      this.dataSource = data;
    })
    .catch((response: any) => { 
      this.exceptionHandlerService.handle(response.error);
      this.comeBack();
    });
  }

  openCardToCreate(){
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
