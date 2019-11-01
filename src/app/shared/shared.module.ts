import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DialogTemplateComponent } from './dialog-template/dialog-template.component';

@NgModule({
  declarations: [DialogTemplateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,

    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

    DialogTemplateComponent,
  ],
  entryComponents: [DialogTemplateComponent],
})
export class SharedModule { }
