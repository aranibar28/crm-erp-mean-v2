import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxTinymceModule } from 'ngx-tinymce';
import { SanitizingPipe } from 'src/app/pipes/sanitizing.pipe';
import { TimePipe } from 'src/app/pipes/time.pipe';

import { ActivityComponent } from './activity/activity.component';
import { InterestComponent } from './interest/interest.component';
import { DashComponent } from './dash/dash.component';
import { CallComponent } from './call/call.component';
import { MailComponent } from './mail/mail.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    ActivityComponent,
    InterestComponent,
    DashComponent,
    CallComponent,
    MailComponent,
    TaskComponent,
    SanitizingPipe,
    TimePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.10.4/',
    }),
  ],
})
export class TrackingCustomerModule {}
