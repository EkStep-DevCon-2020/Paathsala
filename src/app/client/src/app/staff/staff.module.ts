import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { ProfileSelectionComponent } from './components/profile-selection/profile-selection.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PeriodSelectionComponent } from './components/period-selection/period-selection.component'; // for FullCalendar!

@NgModule({
  declarations: [ProfileSelectionComponent, PeriodSelectionComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    FullCalendarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class StaffModule { }
