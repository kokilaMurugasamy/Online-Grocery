import { UserService } from 'shared/services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { switchMap } from 'rxjs/operators';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  constructor(public userService: UserService,public afAuth: AngularFireAuth,private router: ActivatedRoute) {
    this.user$ = afAuth.authState;
   }

  login() {
    const returnUrl = this.router.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
    .switchMap(user => {
      if (user) {
       return this.userService.get(user.uid);
      }
      return Observable.of(null);
    });
  }
}
