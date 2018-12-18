import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators} from '@angular/forms';
import { PrimaveraService, AlertService } from '@app/_services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderLine } from '@app/_models';
import { isNumber } from 'util';

@Component({
  selector: 'app-picking-route',
  templateUrl: './picking-route.component.html',
  styleUrls: ['./picking-route.component.css']
})
export class PickingRouteComponent implements OnInit, OnDestroy {

  items: OrderLine[] = [];
  pickedItems: number[] = [];
  isLoading = true;
  noRoute = false;
  hasErrors = false;
  progress = 0;
  subscription: Subscription;
  waitingResponse = false;

  constructor(
    private primavera: PrimaveraService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private fb: FormBuilder) { }
    displayedColumns: string[];

  showForm() {
    console.log(this.pickedItems);
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (isNaN(this.pickedItems[i]) || this.pickedItems[i] < 0 || this.pickedItems[i] > item.quantity) {
        console.log('Line ' + i + ' has an invalid quantity');
        return;
      }
      item.quantity = this.pickedItems[i];
    }
    this.waitingResponse = true;
    this.primavera.completeRoute(this.items, this.route.snapshot.queryParams.type).then(res => {
      console.log('ON SHOW FORM: ', res);
      this.waitingResponse = false;
      this.router.navigate(['/home']);
    }).catch(err => {
      this.alertService.error(err);
      this.waitingResponse = false;
      console.log('ON SHOW FORM(ERROR): ', err);
    });
  }

  ngOnInit() {
    this.subscription = this.primavera.getRoute().subscribe(res => {
      if (isNumber(res)) {
        this.progress = res;
        return;
      }
      if (res && res.length === 0) {
        this.noRoute = true;
      }
      const items = [];
      for (const item of res) {
        const control = this.fb.control('', Validators.required);
        control.setValue(item.quantity);
        this.pickedItems.push(item.quantity);
        items.push(control);
      }
      this.items = res;
      this.isLoading = false;
    }, (error) => {
      this.alertService.error(error);
      this.isLoading = false;
      console.log('Error calculating optimal route:', error);
      this.hasErrors = true;
    });

    this.displayedColumns = ['Location', 'Name', 'Quantity', 'Picked'];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  log(name) {
    console.log(name);
  }
}
