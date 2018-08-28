import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { PaymentsComponent } from './payments/payments.component';
import { PlatesComponent } from './plates/plates.component';
import { JobsComponent } from './jobs/jobs.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path:"clients",component:ClientsComponent
  },
  {
    path:"payments",component:PaymentsComponent
  },
  {
    path:"plates",component:PlatesComponent
  },
  {
    path:"jobs",component:JobsComponent
  },
  {
    path:"reports",component:ReportsComponent
  },
  {
    path:" ",component:ClientsComponent
  },
  {
    path:"**",component:ClientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
