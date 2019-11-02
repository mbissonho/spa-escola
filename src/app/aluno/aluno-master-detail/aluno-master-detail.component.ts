import { Aluno } from './../../models';
import { ExceptionHandlerService } from 'src/app/exception-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoDataService } from './../aluno-data.service';
import { AlunoDetailComponent } from './../aluno-detail/aluno-detail.component';
import { Component, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-aluno-master-detail',
  templateUrl: './aluno-master-detail.component.html',
  styleUrls: ['./aluno-master-detail.component.scss']
})
export class AlunoMasterDetailComponent implements OnInit {

  @ViewChild('card', { static: false}) card: AlunoDetailComponent;

  private turmaId: number;

  alunoToViewOrUpdate = new Aluno();

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
    this.loadAlunos();
  }

  rowClicked(row: any){

    this.alunoToViewOrUpdate = this.dataSource.filter((aluno) => {
      return aluno.id === row.id;
    })[0];

    if (this.card) {
      this.card.updateAlunoObject(this.alunoToViewOrUpdate);
    }

    this.enableAlunoCard = true;
  }

  loadAlunos(){
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
    this.enableAlunoCard = true;
    if(this.card) {
      this.card.form.reset();
      this.card.setOnCreateState();
    }
  }

  comeBack(){
    this.router.navigateByUrl('turmas');
  }

}
