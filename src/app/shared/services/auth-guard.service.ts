import { AuthService } from 'shared/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

   return this.auth.user$.map(user => {
      if (user) { return true; }

      // tslint:disable-next-line: no-unused-expression
      this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}});
      return false;
    });

  }
}
