import { TestBed } from '@angular/core/testing';

import { FillDbService } from './fill-db.service';

describe('FillDbService', () => {
  let service: FillDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
