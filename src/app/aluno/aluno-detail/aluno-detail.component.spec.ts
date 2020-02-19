import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoDetailComponent } from './aluno-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AlunoDetailComponent', () => {
  let component: AlunoDetailComponent;
  let fixture: ComponentFixture<AlunoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunoDetailComponent ],
      imports: [
        SharedModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
});
