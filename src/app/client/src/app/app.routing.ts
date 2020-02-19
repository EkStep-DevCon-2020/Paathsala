import { NgModule } from '@angular/core';
import { ErrorPageComponent, AuthGuard } from '@sunbird/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSummaryComponent } from './profile-summary/profile-summary.component';
import { PrincipleDashboardComponent } from './principle-dashboard/principle-dashboard.component';
import { PrincipleDashboardClassViewComponent } from './principle-dashboard-class-view/principle-dashboard-class-view.component';
import { PrincipleDashboardTeacherViewComponent } from './principle-dashboard-teacher-view/principle-dashboard-teacher-view.component';

const appRoutes: Routes = [
  {
    path: 'principle/dashboard', component: PrincipleDashboardComponent, children: [
      { path: '', redirectTo: 'class', pathMatch: 'full'},
      { path: 'class', component: PrincipleDashboardClassViewComponent, pathMatch: 'full' },
      { path: 'teacher', component: PrincipleDashboardTeacherViewComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'profile-summary', component: ProfileSummaryComponent,
  },
  {
    path: 'staff', loadChildren: 'app/staff/staff.module#StaffModule'
  },
  {
    path: 'play', loadChildren: 'app/content-consumption/content-consumption.module#ContentConsumptionModule'
  },
  {
    path: 'error', component: ErrorPageComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
