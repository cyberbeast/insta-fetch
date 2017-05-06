import { TestBed, inject } from '@angular/core/testing';

import { ReviewminerService } from './reviewminer.service';

describe('ReviewminerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReviewminerService]
    });
  });

  it('should ...', inject([ReviewminerService], (service: ReviewminerService) => {
    expect(service).toBeTruthy();
  }));
});
