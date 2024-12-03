import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const injectInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService: CookieService = inject(CookieService);
  const authToken = cookieService.get('Authorization');
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  });
  return next(authReq);
};
