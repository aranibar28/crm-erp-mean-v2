import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages/pages.component';
import { Error404Component } from './pages/error404/error404.component';

@NgModule({
  declarations: [PagesComponent, Error404Component],
  imports: [CommonModule, SharedModule, AppRoutingModule],
})
export class CoreModule {}
