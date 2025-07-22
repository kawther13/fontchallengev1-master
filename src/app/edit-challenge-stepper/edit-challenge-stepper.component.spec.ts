import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChallengeStepperComponent } from './edit-challenge-stepper.component';

describe('EditChallengeStepperComponent', () => {
  let component: EditChallengeStepperComponent;
  let fixture: ComponentFixture<EditChallengeStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditChallengeStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditChallengeStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
