import { ShoppingCart } from 'shared/models/shopping-cart';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
  async getCart():Promise <Observable<ShoppingCart>>{
    let cartId =await this.getOrcreateCartId();
   return this.db.object('/shopping-carts/' + cartId)
   .map((x: any) => new ShoppingCart(x.items));
  }

  getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  private async getOrcreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

}
async addToCart(product: Product) {
  let cartId = await this.getOrcreateCartId();
  let item$ = this.getItem(cartId, product.$key);
  item$.take(1).subscribe((item: any) => {
    let quantity =  (item.quantity || 0) + 1 ;
    if(quantity === 0) item$.remove();
    else   item$.update({
    title: product.title,
    imageUrl: product.imageUrl,
    price: product.price,
     quantity:quantity

});
});
}

async removeFromCart(product: Product){
  let cartId = await this.getOrcreateCartId();
  let item$ = this.getItem(cartId, product.$key);
  item$.take(1).subscribe((item: any) => {
    let quantity =  (item.quantity || 0) - 1 ;
    if(quantity === 0) item$.remove();
    else   item$.update({
    title: product.title,
    imageUrl: product.imageUrl,
    price: product.price,
    quantity: quantity

});
});
}
async clearCart(){
   let cartId = await this.getOrcreateCartId();
   this.db.object('/shopping-carts/' + cartId + '/items').remove();
}

}

