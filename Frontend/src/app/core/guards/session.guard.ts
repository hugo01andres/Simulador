import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const sessionGuard: CanActivateFn = (route, state) => {
  const cookieService: CookieService = inject(CookieService);
  const router: Router = inject(Router);

  const token = cookieService.get('Authorization');
  if (!token) {
    router.navigate(['auth']);
    return false;
  }
  
  return true;
};
