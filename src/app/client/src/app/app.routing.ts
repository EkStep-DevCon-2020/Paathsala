import { NgModule } from '@angular/core';
import { ErrorPageComponent, AuthGuard } from '@sunbird/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSummaryComponent } from './profile-summary/profile-summary.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: "profile-summary", component: ProfileSummaryComponent,
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
