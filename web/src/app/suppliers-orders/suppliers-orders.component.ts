import { Component, OnInit } from '@angular/core';
import { Order } from '@app/_models';

const ORDER_DATA: Order[] = [
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 26), content: [
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    }
  ]},
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 26), content: [
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    }
  ]},
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 26), content: [
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    }
  ]},
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 26), content: [
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    }
  ]},
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 26), content: [
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    }
  ]},
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 26), content: [
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    }
  ]},
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 26), content: [
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    }
  ]},
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 26), content: [
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    }
  ]},
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 26), content: [
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    }
  ]},
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 26), content: [
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    },
    {
      name: 'example product',
      reference: 123456789,
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
    }
  ]},
];

@Component({
  selector: 'app-suppliers-orders',
  templateUrl: './suppliers-orders.component.html',
  styleUrls: ['./suppliers-orders.component.css']
})
export class SuppliersOrdersComponent implements OnInit {

  orders: Order[] = ORDER_DATA;
  today: number = Date.now();

  constructor() { }

  dateDiff(date1: any, date2: any): number {
    return Math.floor((date1 - date2) / 1000 / 60 / 60 / 24);
  }

  ngOnInit() {
  }

}
