import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunoMasterDetailComponent } from './aluno-master-detail/aluno-master-detail.component';
import { AlunoDetailComponent } from './aluno-detail/aluno-detail.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AlunoMasterDetailComponent, AlunoDetailComponent],
  imports: [
    CommonModule,

    SharedModule
  ],
  exports: [AlunoMasterDetailComponent]
})
export class AlunoModule { }
