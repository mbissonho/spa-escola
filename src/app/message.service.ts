import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const snackBarDuration = +8000;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  public doMessage(message: string){
    this.snackBar.open(message, null, { duration: snackBarDuration });
  }

}
