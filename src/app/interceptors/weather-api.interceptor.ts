import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class WeatherApiInterceptor implements HttpInterceptor {
  private apiHost = environment.apiHost;
  private apiKey = environment.apiKey;
  private apiProtocol = environment.apiProtocol;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return this.isRelativeUrl(req.url)
      ? next.handle(this.getRequestWithApiInfo(req))
      : next.handle(req);
  }

  private isRelativeUrl(url: string): boolean {
    return /^\./.test(url);
  }

  private getRequestWithApiInfo<T = any>(req: HttpRequest<T>): HttpRequest<T> {
    if (!this.apiHost) {
      return req;
    }

    const updatedReq = req.clone({
      url: req.url.replace('.', `${this.apiProtocol}://${this.apiHost}`),
      params: req.params.append('apikey', this.apiKey as any),
    });

    return updatedReq;
  }
}
