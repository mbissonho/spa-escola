import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TurmaMasterDetailComponent } from './turma-master-detail/turma-master-detail.component';
import { TurmaDetailComponent } from './turma-detail/turma-detail.component';

@NgModule({
  declarations: [TurmaMasterDetailComponent, TurmaDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    TurmaMasterDetailComponent
  ]
})
export class TurmaModule { }
