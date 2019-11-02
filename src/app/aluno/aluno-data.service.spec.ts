import { TestBed } from '@angular/core/testing';

import { AlunoDataService } from './aluno-data.service';

describe('AlunoDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlunoDataService = TestBed.get(AlunoDataService);
    expect(service).toBeTruthy();
  });
});
