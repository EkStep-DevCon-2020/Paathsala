import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileSelectionComponent, PeriodSelectionComponent} from './components';

const routes: Routes = [
  {path: 'profile/selection', component: ProfileSelectionComponent},
  {path: 'period/selection/:id', component: PeriodSelectionComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
