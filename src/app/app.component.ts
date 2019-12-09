import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Online-Grocery';
  constructor(private userService: UserService, private auth: AuthService, private router: Router) {
    auth.user$.subscribe(user => {
      // tslint:disable-next-line: curly
      // tslint:disable-next-line: no-trailing-whitespace
      // tslint:disable-next-line: curly
      if (!user) return;
      userService.save(user);
      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) { return; }
      if (returnUrl) {
        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }

    });

  }
}
