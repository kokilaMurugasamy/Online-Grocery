import { Product } from 'shared/models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';


@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input() product: Product;

  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  removeFromCart(product: Product)
  {
    this.cartService.removeFromCart(product);
  }




}
