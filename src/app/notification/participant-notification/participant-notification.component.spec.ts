import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantNotificationComponent } from './participant-notification.component';

describe('ParticipantNotificationComponent', () => {
  let component: ParticipantNotificationComponent;
  let fixture: ComponentFixture<ParticipantNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
