import { Product } from './../_models/product';
import { PrimaveraService, AlertService } from '@app/_services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-picking-route',
  templateUrl: './picking-route.component.html',
  styleUrls: ['./picking-route.component.css']
})
export class PickingRouteComponent implements OnInit {

  items: Product[] = [];
  isLoading = true;
  hasErrors = false;

  constructor(
    private primavera: PrimaveraService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.primavera.createRoute([]).subscribe((res) => {
      this.items = res;
      this.isLoading = false;
    }, (error) => {
      this.alertService.error(error);
      this.isLoading = false;
      console.log('Error calculating optimal route:', error);
      this.hasErrors = true;
    });
  }

}
