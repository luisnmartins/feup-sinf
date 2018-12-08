import { Router } from '@angular/router';
import { AlertService } from '@app/_services';
import { PrimaveraService } from './../_services/primavera.service';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Order, OrderLine } from '@app/_models';
import { OrderComponent } from '@app/order/order.component';

@Component({
  selector: 'app-suppliers-orders',
  templateUrl: './suppliers-orders.component.html',
  styleUrls: ['./suppliers-orders.component.css']
})
export class SuppliersOrdersComponent implements OnInit {

  @ViewChildren(OrderComponent) orderCompns !: QueryList<OrderComponent>;

  isLoading = true;
  hasErrors = false;
  orders: Order[];
  origLines: OrderLine[];
  today: number = Date.now();

  constructor(
    private primavera: PrimaveraService,
    private alertService: AlertService,
    private router: Router) { }

  dateDiff(date1: any, date2: any): string {
    const val = Math.ceil((date1 - date2) / 1000 / 60 / 60 / 24);
   if (val === 1) {
     return Math.abs(val) + ' day left';
   } else if (val === -1) {
     return Math.abs(val) + ' day overdue';
   } else if (val >= 0) {
     return Math.abs(val) + ' days left';
   } else {
     return Math.abs(val) + ' days overdue';
   }
  }

  createRoute() {
    this.router.navigate(['/routing'], {  queryParams: {type: 'Compras'}});
    const selectedLines: OrderLine[] = [];
    this.orderCompns.forEach((order) => {
      selectedLines.push(...order.getSelected());
    });
    this.primavera.createRoute(selectedLines);
  }

  private getECF() {
    this.primavera.getECF().subscribe((res) => {
      this.orders = [];
      this.orders = this.primavera.parseOrderLines(res.DataSet.Table);
      this.isLoading = false;
    }, (err) => {
      this.alertService.error(err);
      this.isLoading = false;
      console.log('Error getting ECF', err);
      this.hasErrors = true;
    });
  }

  ngOnInit() {
    this.getECF();
  }

}
