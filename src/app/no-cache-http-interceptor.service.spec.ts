import { TestBed } from '@angular/core/testing';

import { NoCacheHttpInterceptorService } from './no-cache-http-interceptor.service';

describe('NoCacheHttpInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoCacheHttpInterceptorService = TestBed.get(NoCacheHttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
