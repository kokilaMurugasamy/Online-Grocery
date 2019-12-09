import { Product } from './product';
import { ShopingCartItem } from './shopping-cart-item';

export class ShoppingCart{
  items: ShopingCartItem[] = [];
  static items: any;

  constructor(private itemsMap: {[productId: string]:ShopingCartItem } ){
    this.itemsMap = itemsMap || {};
    for(let productId in itemsMap){
      let item = itemsMap[productId];
      let x = new ShopingCartItem();
      Object.assign(x,item);
      x.$key = productId;
      this.items.push(new ShopingCartItem({...item, $key: productId}));
    }

  }
  getQuantity(product: Product){

    let item = this.itemsMap[product.$key];
    return item? item.quantity : 0;
  }

  get totalPrice(){
    let sum = 0;
    for(let productId in this.items)
    sum +=this.items[productId].totalPrice;
    return sum;

  }

  get productIds(){
    return Object.keys(this.itemsMap);
  }

  get totalItemCounts(){
    let count =0;
  for(let productId in this.itemsMap)
  count += this.itemsMap[productId].quantity;
  return count;

  }
}
