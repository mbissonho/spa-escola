import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoMasterDetailComponent } from './aluno-master-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlunoDataService } from '../aluno-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExceptionHandlerService } from 'src/app/exception-handler.service';

class AlunoDataServiceMock {



  loadByTurma(){
    return Promise.resolve([
      { id: 1, nome: 'Augusto', quantidadeDeFaltas: 4, mediaDeNotas: 7.5 }
    ]);
  }

}

describe('AlunoMasterDetailComponent', () => {
  
  let component: AlunoMasterDetailComponent;
  let fixture: ComponentFixture<AlunoMasterDetailComponent>;

  let alunoDataServiceMock = new AlunoDataServiceMock();

  
  beforeEach(async(() => {

    const acRoute = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    const router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const exceptionH = jasmine.createSpyObj('ExceptionHandlerService', ['handle']);

    
    TestBed.configureTestingModule({
      declarations: [ AlunoMasterDetailComponent ],
      imports: [SharedModule],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: AlunoDataService, useValue:  alunoDataServiceMock},
        { provide: ActivatedRoute, useValue: {snapshot: {params: {'id': '1'}}} },
        { provide: Router, useValue: router },
        { provide: ExceptionHandlerService, useValue: exceptionH }
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoMasterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('table should contain one line', () => {

    

  });

});
