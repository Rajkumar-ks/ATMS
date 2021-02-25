import { TestBed } from '@angular/core/testing';

import { LoaderinterceptorsService } from './loaderinterceptors.service';

describe('LoaderinterceptorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderinterceptorsService = TestBed.get(LoaderinterceptorsService);
    expect(service).toBeTruthy();
  });
});
