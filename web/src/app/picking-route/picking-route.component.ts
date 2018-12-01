import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;
  isLoading = true;
  hasErrors = false;

  constructor(
    private primavera: PrimaveraService,
    private alertService: AlertService,
    private fb: FormBuilder) { }

  showForm() {
    console.log(this.form.value);
  }

  ngOnInit() {
    this.primavera.createRoute([]).subscribe((res) => {
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
