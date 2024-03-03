import { TestBed } from '@angular/core/testing';

import { ClickedOutsideService } from './clicked-outside.service';

describe('ClickedOutsideService', () => {
  let service: ClickedOutsideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickedOutsideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
