import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateCycleComponent } from './create-cycle/create-cycle.component';
import { ExpiredCycleComponent } from './expired-cycle/expired-cycle.component';
import { IndexCycleComponent } from './index-cycle/index-cycle.component';
import { UpdateCycleComponent } from './update-cycle/update-cycle.component';

const routes: Routes = [
  { path: 'course/:id', component: IndexCycleComponent },
  { path: 'course/:id/expired', component: ExpiredCycleComponent },
  { path: 'course/:id/create', component: CreateCycleComponent },
  { path: 'course/:id/update/:cycle', component: UpdateCycleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CyclesRoutingModule {}
