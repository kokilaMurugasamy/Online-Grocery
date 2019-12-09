import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products: any = {  };
filteredProducts: Product[] = [];
cart$: Observable<ShoppingCart>;
category: string;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingcartservice: ShoppingCartService
   ) { }

 async  ngOnInit(){
   this.cart$= await this.shoppingcartservice.getCart();
   this.populateProducts();
  }

private applyFilter()
{

  this.filteredProducts = (this.category) ?
  this.products.filter(p => p.category === this.category) :
  this.products;
}
private populateProducts(){
  this.productService.getAll().switchMap(products => {
    this.products = products;
    return this.route.queryParamMap;})
    .subscribe(params => {
   this.category = params.get('category');
   this.applyFilter();
 });
}

  }
