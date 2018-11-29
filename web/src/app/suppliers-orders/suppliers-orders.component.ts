import { AlertService } from '@app/_services';
import { PrimaveraService } from './../_services/primavera.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '@app/_models';

@Component({
  selector: 'app-suppliers-orders',
  templateUrl: './suppliers-orders.component.html',
  styleUrls: ['./suppliers-orders.component.css']
})
export class SuppliersOrdersComponent implements OnInit {

  isLoading = true;
  hasErrors = false;
  orders: Order[];
  today: number = Date.now();

  constructor(
    private primavera: PrimaveraService,
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
