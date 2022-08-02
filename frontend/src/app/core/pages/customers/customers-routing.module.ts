import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { IndexCustomerComponent } from './index-customer/index-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { TrackingCustomerComponent } from './tracking-customer/tracking-customer.component';

import { ActivityComponent } from './tracking-customer/activity/activity.component';
import { InterestComponent } from './tracking-customer/interest/interest.component';
import { DashComponent } from './tracking-customer/dash/dash.component';
import { CallComponent } from './tracking-customer/call/call.component';
import { MailComponent } from './tracking-customer/mail/mail.component';
import { TaskComponent } from './tracking-customer/task/task.component';

const routes: Routes = [
  { path: '', component: IndexCustomerComponent },
  { path: 'create', component: CreateCustomerComponent },
  { path: 'update/:id', component: UpdateCustomerComponent },
  {
    path: 'tracking/:id',
    component: TrackingCustomerComponent,
    children: [
      { path: 'dash', component: DashComponent, data: { title: 'Clientes' } },
      { path: 'call', component: CallComponent, data: { title: 'Clientes' } },
      { path: 'mail', component: MailComponent, data: { title: 'Clientes' } },
      { path: 'task', component: TaskComponent, data: { title: 'Clientes' } },
      { path: 'activity', component: ActivityComponent, data: { title: 'Clientes' } },
      { path: 'interest', component: InterestComponent, data: { title: 'Clientes' } },
      { path: '**', redirectTo: 'dash' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
