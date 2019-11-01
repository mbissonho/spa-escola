import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoMasterDetailComponent } from './aluno-master-detail.component';

describe('AlunoMasterDetailComponent', () => {
  let component: AlunoMasterDetailComponent;
  let fixture: ComponentFixture<AlunoMasterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunoMasterDetailComponent ]
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
});
