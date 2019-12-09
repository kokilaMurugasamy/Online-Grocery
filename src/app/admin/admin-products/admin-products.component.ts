import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];

  subscription: Subscription;
  tabelResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
    .subscribe(products => {
      this.products = products;
      this.initializeTableResource(products);
    });

   // tslint:disable-next-line: align

  }

  private initializeTableResource(products: Product[]) {
    this.tabelResource = new DataTableResource(products);
    this.tabelResource.query({offset: 0})
    .then(items => this.items = items);
    this.tabelResource.count()
    .then (count => this.itemCount = count);

  }
  reloadItem(params) {
    // tslint:disable-next-line: curly
    if (!this.tabelResource) return;
    this.tabelResource.query(params)
    .then(items => this.items = items);

  }

  filter(query: string) {
  const filteredProducts = (query) ?
  this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
  this.products;
  this.initializeTableResource(filteredProducts);
  }
  ngOnInit() {
  }
   ngOnDestroy() {
     this.subscription.unsubscribe();

   }

}
