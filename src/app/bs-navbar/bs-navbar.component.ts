import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AuthService } from 'shared/services/auth.service';

import { Component, OnInit } from '@angular/core';
import { AppUser } from 'shared/models/app-user';



@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  constructor(public auth: AuthService, private shopingcartService: ShoppingCartService) {

  }
async ngOnInit(){
  this.auth.appUser$.subscribe(async appUser => {
    this.appUser = appUser;
   this.cart$ = await this.shopingcartService.getCart();
 });

}
  logout() {

this.auth.logout();

  }
}
