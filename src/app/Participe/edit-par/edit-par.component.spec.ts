import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParComponent } from './edit-par.component';

describe('EditParComponent', () => {
  let component: EditParComponent;
  let fixture: ComponentFixture<EditParComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditParComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
