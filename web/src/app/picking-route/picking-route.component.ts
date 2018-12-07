import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimaveraService, AlertService } from '@app/_services';
import { Component, OnInit } from '@angular/core';
import { OrderLine } from '@app/_models';
import { isNumber } from 'util';
import { takeLast } from 'rxjs/operators';

@Component({
  selector: 'app-picking-route',
  templateUrl: './picking-route.component.html',
  styleUrls: ['./picking-route.component.css']
})
export class PickingRouteComponent implements OnInit {

  items: OrderLine[] = [];
  form: FormGroup;
  isLoading = true;
  noRoute = false;
  hasErrors = false;
  progress = 0;

  constructor(
    private primavera: PrimaveraService,
    private alertService: AlertService,
    private fb: FormBuilder) { }

  showForm() {
    console.log(this.form.value);
  }

  ngOnInit() {
    this.primavera.getRoute().subscribe(res => {
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
}
