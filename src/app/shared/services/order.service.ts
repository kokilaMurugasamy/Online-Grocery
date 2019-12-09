import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrder(){
    return this.db.list('/orders');
  }

  getOrderById(orderId) {
    return this.db.object('/orders/' + orderId);
  }

  getPrderByUserId(userId: string)
  {
    return this.db.list('/orders' ,{
      query: {
        orderByChild:'userId',
        equalTo: userId
      }
    });
  }



}
