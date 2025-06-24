import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeChaComponent } from './liste-cha.component';

describe('ListeChaComponent', () => {
  let component: ListeChaComponent;
  let fixture: ComponentFixture<ListeChaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeChaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeChaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
