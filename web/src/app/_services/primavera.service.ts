import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { TokenRes, Order } from '@app/_models';

const CUST_ORDER_DATA: Order[] = [
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 24), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 25), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 26), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 20), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 30), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 20), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 20), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 20), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 20), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 20), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
];

const SUP_ORDER_DATA: Order[] = [
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 24), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 25), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 26), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 20), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 30), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 20), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 20), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 20), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 20), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 20), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
];


@Injectable({ providedIn: 'root' })
export class PrimaveraService {

    private currentTokenSubject: BehaviorSubject<TokenRes>;
    public currentToken: Observable<TokenRes>;

    constructor(private http: HttpClient) {
            this.currentTokenSubject = new BehaviorSubject<TokenRes>(JSON.parse(localStorage.getItem('currentToken')));
            this.currentToken = this.currentTokenSubject.asObservable();
    }

    public get currentTokenValue(): TokenRes {
        return this.currentTokenSubject.value;
    }

    async getToken() {
        const body = new URLSearchParams();
        body.append('username', 'FEUP'),
        body.append('password', 'qualquer1');
        body.append('company', 'BELAFLOR');
        body.append('instance', 'DEFAULT');
        body.append('grant_type', 'password');
        body.append('line', 'professional');
        this.http.post<TokenRes>(`${environment.primaveraUrl}/token`, body.toString(), {}).subscribe((res) => {
            console.log(res);
            localStorage.setItem('currentToken', JSON.stringify(res));
            this.currentTokenSubject.next(res);
        }, (err) => {
            console.log('error:', err);
        });
    }

    getECL(): Observable<Order[]> {
        // this.http.get(`${environment.primaveraUrl}/Administrador/Consulta`, {
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        // });
        return of(CUST_ORDER_DATA);
    }

    getECF(): Observable<Order[]> {
        // this.http.get(`${environment.primaveraUrl}/Administrador/Consulta`);
        return of(SUP_ORDER_DATA);
    }
}
