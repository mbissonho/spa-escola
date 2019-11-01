import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaMasterDetailComponent } from './turma-master-detail.component';

describe('TurmaMasterDetailComponent', () => {
  let component: TurmaMasterDetailComponent;
  let fixture: ComponentFixture<TurmaMasterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmaMasterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmaMasterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
