import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DialogTemplateComponent } from './dialog-template/dialog-template.component';



@NgModule({
  declarations: [DialogTemplateComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [DialogTemplateComponent],
  entryComponents: [DialogTemplateComponent],
})
export class SharedModule { }
