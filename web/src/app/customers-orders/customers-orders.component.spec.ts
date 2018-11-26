import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersOrdersComponent } from './customers-orders.component';

describe('CustomersOrdersComponent', () => {
  let component: CustomersOrdersComponent;
  let fixture: ComponentFixture<CustomersOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
