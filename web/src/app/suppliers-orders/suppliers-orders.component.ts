import { Component, OnInit } from '@angular/core';
import { Order } from '@app/_models';

const ORDER_DATA: Order[] = [
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 24), content: [
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
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 25), content: [
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
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 20), content: [
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
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 30), content: [
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
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 20), content: [
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
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 20), content: [
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
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 20), content: [
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
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 20), content: [
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
  { supplier: 'SOFRIO', name: 'ECL', date: new Date(2018, 10, 20), content: [
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

  ngOnInit() {
  }

}
