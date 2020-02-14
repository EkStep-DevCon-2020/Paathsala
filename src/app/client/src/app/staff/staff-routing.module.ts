import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileSelectionComponent, PeriodSelectionComponent } from './components'
const routes: Routes = [
  {path: 'profile/selection', component: ProfileSelectionComponent},
  {path: 'period/selection', component: PeriodSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
