import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreRuleComponent } from './score-rule.component';

describe('ScoreRuleComponent', () => {
  let component: ScoreRuleComponent;
  let fixture: ComponentFixture<ScoreRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreRuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
