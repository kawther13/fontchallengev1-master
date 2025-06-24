import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChallengeeComponent } from './add-challengee.component';

describe('AddChallengeeComponent', () => {
  let component: AddChallengeeComponent;
  let fixture: ComponentFixture<AddChallengeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChallengeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChallengeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
