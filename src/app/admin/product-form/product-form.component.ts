import { Observable } from 'rxjs/Observable';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
 categories$;
 product: any = {};
 id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private  categoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).take(1).subscribe( p  =>  {this.product = p; }); }
  }

  save(product) {
    // tslint:disable-next-line: curly
    if (this.id) this.productService.update(this.id, product);
    // tslint:disable-next-line: curly
    else this.productService.create(product);
 // tslint:disable-next-line: align
     this.router.navigate(['/admin-products']);
  }
  delete(){
    // tslint:disable-next-line: curly
    if (!confirm('Are you sure want to delete this product?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin-products']);
  }

  ngOnInit() {
  }


}
