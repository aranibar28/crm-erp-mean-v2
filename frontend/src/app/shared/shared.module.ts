import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, SidebarComponent, BreadcrumbsComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, FooterComponent, SidebarComponent, BreadcrumbsComponent],
})
export class SharedModule {}
