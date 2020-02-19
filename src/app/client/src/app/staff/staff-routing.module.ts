import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileSelectionComponent, PeriodSelectionComponent, DashboardComponent} from './components';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {path: 'dashboard/:sessionId', component: DashboardComponent, pathMatch: 'full'},
  {path: 'profile/selection', component: ProfileSelectionComponent},
  {path: 'period/selection/:id', component: PeriodSelectionComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
