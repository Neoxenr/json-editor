// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// RxJS
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  public status: number = 200;

  public message: string = '';

  private routeSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.status = queryParams['status'];

        this.message = queryParams['message'];
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
