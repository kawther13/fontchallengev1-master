import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChallengeStepperComponent } from './add-challenge-stepper.component';

describe('AddChallengeStepperComponent', () => {
  let component: AddChallengeStepperComponent;
  let fixture: ComponentFixture<AddChallengeStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChallengeStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChallengeStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
