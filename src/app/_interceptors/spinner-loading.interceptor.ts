import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerBusyService } from '../_services/ThirdParty/spinner-busy.service';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerLoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: SpinnerBusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.busyService.busy();
    return next.handle(request).pipe(
      delay(1000),
      finalize(() => {
        this.busyService.idle();
      })
    );
  }
}
