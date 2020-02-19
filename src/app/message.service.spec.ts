import { TestBed } from '@angular/core/testing';


import { MessageService } from './message.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MessageService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({
    
  }));

  it('should be created', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });
});
