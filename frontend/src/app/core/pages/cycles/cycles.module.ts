import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxTinymceModule } from 'ngx-tinymce';

import { CyclesRoutingModule } from './cycles-routing.module';
import { IndexCycleComponent } from './index-cycle/index-cycle.component';
import { CreateCycleComponent } from './create-cycle/create-cycle.component';
import { UpdateCycleComponent } from './update-cycle/update-cycle.component';
import { ExpiredCycleComponent } from './expired-cycle/expired-cycle.component';

@NgModule({
  declarations: [
    IndexCycleComponent,
    CreateCycleComponent,
    UpdateCycleComponent,
    ExpiredCycleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CyclesRoutingModule,
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.10.4/',
    }),
  ],
})
export class CyclesModule {}
