import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodSelectionComponent } from './period-selection.component';

describe('PeriodSelectionComponent', () => {
  let component: PeriodSelectionComponent;
  let fixture: ComponentFixture<PeriodSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
