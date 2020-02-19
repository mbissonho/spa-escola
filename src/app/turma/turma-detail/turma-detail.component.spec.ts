import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaDetailComponent } from './turma-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TurmaDetailComponent', () => {
  let component: TurmaDetailComponent;
  let fixture: ComponentFixture<TurmaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmaDetailComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
