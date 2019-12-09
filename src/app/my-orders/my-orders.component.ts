import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
order$;
  constructor(private orderService: OrderService, private authService: AuthService) {
    this.order$ = authService.user$.switchMap(u => orderService.getPrderByUserId(u.uid));
    console.log("im here==============");
    console.log(this.order$);
  }

  ngOnInit() {
  }

}
