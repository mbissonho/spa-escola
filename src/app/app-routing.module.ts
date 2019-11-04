import { AlunoMasterDetailComponent } from './aluno/aluno-master-detail/aluno-master-detail.component';
import { TurmaMasterDetailComponent } from './turma/turma-master-detail/turma-master-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const appRoutes = {
  turma: 'turmas',
  aluno: 'alunos'
};

const configRoutes: Routes = [
  { path: '', redirectTo: appRoutes.turma, pathMatch: 'full' },
  { path: `${appRoutes.turma}`, component: TurmaMasterDetailComponent },
  { path: `${appRoutes.aluno}/:id`, component: AlunoMasterDetailComponent },
  { path: '**', redirectTo: appRoutes.turma }
];

@NgModule({
  imports: [RouterModule.forRoot(configRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
