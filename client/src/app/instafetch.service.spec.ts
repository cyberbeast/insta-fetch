import { TestBed, inject } from '@angular/core/testing';

import { InstafetchService } from './instafetch.service';

describe('InstafetchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstafetchService]
    });
  });

  it('should ...', inject([InstafetchService], (service: InstafetchService) => {
    expect(service).toBeTruthy();
  }));
});
