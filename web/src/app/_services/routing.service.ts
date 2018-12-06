import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor() { }

  createRoute(): Observable<Product[]> {
    const subject = new Subject<Product[]>();

    return subject.asObservable();
  }
}
