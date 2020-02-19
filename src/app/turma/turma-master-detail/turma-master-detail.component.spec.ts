import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaMasterDetailComponent } from './turma-master-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TurmaMasterDetailComponent', () => {
  
  let component: TurmaMasterDetailComponent;
  let fixture: ComponentFixture<TurmaMasterDetailComponent>;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmaMasterDetailComponent ],
      schemas: [
          NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmaMasterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
