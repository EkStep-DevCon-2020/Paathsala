import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StaffRoutingModule } from './staff-routing.module';
import { ProfileSelectionComponent } from './components/profile-selection/profile-selection.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PeriodSelectionComponent } from './components/period-selection/period-selection.component'; // for FullCalendar!
import { DataService } from './service/data.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TelemetryService } from './service/telemetry.service';
import { QrcodepopupComponent } from './components/qrcodepopup/qrcodepopup.component';
import { SuiModalModule } from 'ng2-semantic-ui';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileSelectionComponent, PeriodSelectionComponent, DashboardComponent, SideMenuComponent, QrcodepopupComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StaffRoutingModule,
    FullCalendarModule,
    SuiModalModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [
    DataService,
    TelemetryService
  ],
  exports: [SideMenuComponent]
})
export class StaffModule { }
