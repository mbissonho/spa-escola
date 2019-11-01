import { TestBed } from '@angular/core/testing';

import { TurmaDataService } from './turma-data.service';

describe('TurmaDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TurmaDataService = TestBed.get(TurmaDataService);
    expect(service).toBeTruthy();
  });
});
