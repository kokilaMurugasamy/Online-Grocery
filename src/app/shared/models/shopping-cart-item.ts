
import { Product } from './product';

export class ShopingCartItem{
  $key: string;
  title: string;
  imageUrl: string;
  quantity: number;
  price: number;

  constructor(init? : Partial<ShopingCartItem>){
    Object.assign(this, init);

  }

  get totalPrice(){
    return this.price*this.quantity;
  }
}
