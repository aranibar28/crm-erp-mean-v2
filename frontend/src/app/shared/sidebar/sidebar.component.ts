import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PublicService } from 'src/app/services/public.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public path = environment.base_url + '/collaborators/image/';
  public user: any = undefined;
  public sidebar: any;

  constructor(
    private authService: AuthService,
    private publicService: PublicService
  ) {}

  ngOnInit(): void {
    this.is_logged();
    this.sidebar = this.publicService.sidebar;
  }

  is_logged() {
    if (this.authService.user) {
      this.user = JSON.parse(localStorage.getItem('user')!);
    } else {
      this.user = undefined;
    }
  }
}
