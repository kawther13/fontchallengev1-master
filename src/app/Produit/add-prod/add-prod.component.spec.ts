import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdComponent } from './add-prod.component';

describe('AddProdComponent', () => {
  let component: AddProdComponent;
  let fixture: ComponentFixture<AddProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
