import { TestBed } from '@angular/core/testing';

import { PunkApiService } from './punk-api.service';

describe('PunkApiService', () => {
  let service: PunkApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PunkApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
