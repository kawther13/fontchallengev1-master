import { TestBed } from '@angular/core/testing';

import { TypeScoreService } from './type-score.service';

describe('TypeScoreService', () => {
  let service: TypeScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
