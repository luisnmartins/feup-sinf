import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { TokenRes, Order } from '@app/_models';

const CUST_ORDER_DATA: Order[] = [
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

const SUP_ORDER_DATA: Order[] = [
    {
        supplier: 'SOFRIO', name: 'ECF', date: new Date(2018, 10, 24), content: [
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
        ]
    },
    {
        supplier: 'SOFRIO', name: 'ECF', date: new Date(2018, 10, 25), content: [
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
        ]
    },
    {
        supplier: 'SOFRIO', name: 'ECF', date: new Date(2018, 10, 26), content: [
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
        ]
    },
    {
        supplier: 'SOFRIO', name: 'ECF', date: new Date(2018, 10, 20), content: [
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
        ]
    },
    {
        supplier: 'SOFRIO', name: 'ECF', date: new Date(2018, 10, 30), content: [
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
        ]
    },
    {
        supplier: 'SOFRIO', name: 'ECF', date: new Date(2018, 10, 20), content: [
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
        ]
    },
    {
        supplier: 'SOFRIO', name: 'ECF', date: new Date(2018, 10, 20), content: [
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
        ]
    },
    {
        supplier: 'SOFRIO', name: 'ECF', date: new Date(2018, 10, 20), content: [
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
        ]
    },
    {
        supplier: 'SOFRIO', name: 'ECF', date: new Date(2018, 10, 20), content: [
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
        ]
    },
    {
        supplier: 'SOFRIO', name: 'ECF', date: new Date(2018, 10, 20), content: [
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
        // const req = new XMLHttpRequest();
        // req.open('GET', `${environment.primaveraUrl}/Administrador/Consulta`);
        // req.onload = (res) => {
        //     console.log(res);
        // };
        // req.setRequestHeader('Authorization', 'Bearer ' + this.currentTokenValue.access_token);
        // req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // req.send('SELECT * FROM ArmazemLocalizacoes');

        // this.http.get(`${environment.primaveraUrl}/Administrador/Consulta`, {
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        // }).subscribe((res) => {
        //     console.log(res);
        // }, (err) => {
        //     console.log('error:', err);
        // });
        return of(CUST_ORDER_DATA);
    }

    getECF(): Observable<Order[]> {
        // this.http.get(`${environment.primaveraUrl}/Administrador/Consulta`).subscribe((res) => {
        //     console.log(res);
        // }, (err) => {
        //     console.log('error:', err);
        // });
        return of(SUP_ORDER_DATA);
    }
}
