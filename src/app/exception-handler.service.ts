import { MessageService } from 'src/app/message.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExceptionHandlerService {

  constructor(
    private messageService: MessageService
  ) { }

  handle(error: any){
    if(error) {
      this.messageService.doMessage(error[0].userMessage);
    }
  }

}
