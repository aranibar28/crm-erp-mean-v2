import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnDestroy {
  public title: string = '';
  public titleSubs$!: Subscription;

  constructor(private router: Router) {
    this.titleSubs$ = this.get_route_arguments().subscribe(({ title }) => {
      this.title = title;
      document.title = `Panel - ${title}`;
    });
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
    document.title = 'Marketplace';
  }

  get_route_arguments() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: any) => event.snapshot.firstChild == null),
      map((event: any) => event.snapshot.data)
    );
  }
}
