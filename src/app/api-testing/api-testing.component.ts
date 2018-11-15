import { ApiCallsService } from './../api-calls.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-testing',
  templateUrl: './api-testing.component.html',
  styleUrls: ['./api-testing.component.css']
})
export class ApiTestingComponent implements OnInit {

  constructor(private api: ApiCallsService) { }

  getToken() {
    this.api.getCompanyToken().subscribe(res => {
      console.log('success', res);
    }, err => {
      console.log('error', err);
    });
  }

  ngOnInit() {
  }

}
