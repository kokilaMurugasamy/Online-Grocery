import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {
  orderId: string;
  order: any;
  id;
  constructor(private route: ActivatedRoute,private orderService: OrderService) {

  this.id = this.route.snapshot.paramMap.get('id');
  if (this.id) {
    this.orderService.getOrderById(this.id).take(1).subscribe( o  =>  {
      console.log("data:", o);
    this.order = o; }); }
}
   }





