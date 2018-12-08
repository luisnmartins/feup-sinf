import { Router } from '@angular/router';
import { AlertService } from '@app/_services';
import { PrimaveraService } from './../_services/primavera.service';
import { Component, OnInit } from '@angular/core';
import { Order, OrderLine } from '@app/_models';

@Component({
  selector: 'app-customers-orders',
  templateUrl: './customers-orders.component.html',
  styleUrls: ['./customers-orders.component.css']
})
export class CustomersOrdersComponent implements OnInit {

  isLoading = true;
  hasErrors = false;
  orders: Order[];
  today: number = Date.now();

  constructor(
    private primavera: PrimaveraService,
    private router: Router,
    private alertService: AlertService) { }

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
    this.router.navigate(['/routing'], { queryParams: { type: 'Vendas' } });
    const selectedLines: OrderLine[] = [];
    this.primavera.createRoute(selectedLines);
  }

  private getECL() {
    this.primavera.getECL().subscribe((res) => {
      this.orders = [];
      this.orders = this.primavera.parseOrderLines(res.DataSet.Table);
      this.isLoading = false;
    }, (err) => {
      this.alertService.error(err);
      this.isLoading = false;
      console.log('Error getting ECL', err);
      this.hasErrors = true;
    });
  }

  ngOnInit() {
    this.getECL();
  }

}
