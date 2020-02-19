import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipleDashboardClassViewComponent } from './principle-dashboard-class-view.component';

describe('PrincipleDashboardClassViewComponent', () => {
  let component: PrincipleDashboardClassViewComponent;
  let fixture: ComponentFixture<PrincipleDashboardClassViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipleDashboardClassViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipleDashboardClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
