import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ResponseLimitInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let remainLimit: number;

    return next.handle(req).pipe(
      tap({
        // Succeeds when there is a response; ignore other events
        next: (event) => {
          if (event instanceof HttpResponse) {
            remainLimit = Number(event.headers.get('x-ratelimit-remaining'));

            if (remainLimit < 10) alert(`${remainLimit} request remaining`);
            if (remainLimit === 1) alert('No request remaining. Wait and try');
          }
        },
      })
    );
  }
}
