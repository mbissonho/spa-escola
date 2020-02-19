import { TestBed } from '@angular/core/testing';

import { ExceptionHandlerService } from './exception-handler.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MessageService } from 'src/app/message.service';

describe('ExceptionHandlerService', () => {

  beforeEach(() => { 
    
    const messageServ = jasmine.createSpyObj('MessageService', ['doMessage']);
    
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: MessageService, useValue: messageServ }
      ]
    })

  });

  it('should be created', () => {
    const service: ExceptionHandlerService = TestBed.get(ExceptionHandlerService);
    expect(service).toBeTruthy();
  });
});
