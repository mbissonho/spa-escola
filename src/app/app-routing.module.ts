import { AlunoMasterDetailComponent } from './aluno/aluno-master-detail/aluno-master-detail.component';
import { TurmaMasterDetailComponent } from './turma/turma-master-detail/turma-master-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'turmas', pathMatch: 'full' },
  { path: 'turmas', component: TurmaMasterDetailComponent },
  { path: 'alunos/:id', component: AlunoMasterDetailComponent },
  { path: '**', redirectTo: 'turmas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
