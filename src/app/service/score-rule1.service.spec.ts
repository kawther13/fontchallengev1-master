import { TestBed } from '@angular/core/testing';

import { ScoreRule1Service } from './score-rule1.service';

describe('ScoreRule1Service', () => {
  let service: ScoreRule1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreRule1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
