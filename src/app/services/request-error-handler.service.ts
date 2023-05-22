// Angular
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// RxJS
import { Observable, EMPTY } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestErrorHandlerService {
  constructor(private router: Router) {}

  handleError(err: HttpErrorResponse): Observable<never> {
    this.router.navigate(['/error'], {
      queryParams: {
        status: err.status,
        message: err.statusText,
      },
    });

    return EMPTY;
  }
}
