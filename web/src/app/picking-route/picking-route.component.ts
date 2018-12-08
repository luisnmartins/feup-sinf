import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;
  isLoading = true;
  noRoute = false;
  hasErrors = false;
  progress = 0;
  subscription: Subscription;

  constructor(
    private primavera: PrimaveraService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private fb: FormBuilder) { }

  showForm() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      item.quantity = this.form.value.items[i];
    }
    this.primavera.completeRoute(this.items, this.route.snapshot.queryParams.type).then(res => {
      console.log('ON SHOW FORM: ', res);
    }).catch(err => {
      console.log('ON SHOW FORM(ERROR): ', err);
    });
    // console.log('BEFORE PROMISE ALL');
    // Promise.all(promisses).then((result) => {
    //   console.log('RESULT: ', result);
    // }).catch((error) => {
    //   console.log('ERROR: ', error);
    // });
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
        items.push(control);
      }
      this.form = this.fb.group({
        items: this.fb.array(items)
      });
      this.items = res;
      this.isLoading = false;
    }, (error) => {
      this.alertService.error(error);
      this.isLoading = false;
      console.log('Error calculating optimal route:', error);
      this.hasErrors = true;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
