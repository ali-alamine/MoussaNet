import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockComponent } from './stock/stock.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscribersReportComponent } from './subscribers-report/subscribers-report.component';

const routes: Routes = [
  {
    path:"subscribers",component:SubscribersComponent
  },
  {
    path:"stock",component:StockComponent
  },
  {
    path:"subscription",component:SubscriptionComponent
  },
  {
    path:"subscribersReport",component:SubscribersReportComponent
  },
  {
    path:"",component:StockComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
