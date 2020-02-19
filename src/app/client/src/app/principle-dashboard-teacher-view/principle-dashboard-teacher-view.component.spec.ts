import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipleDashboardTeacherViewComponent } from './principle-dashboard-teacher-view.component';

describe('PrincipleDashboardTeacherViewComponent', () => {
  let component: PrincipleDashboardTeacherViewComponent;
  let fixture: ComponentFixture<PrincipleDashboardTeacherViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipleDashboardTeacherViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipleDashboardTeacherViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
