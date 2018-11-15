import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(private http: HttpClient) { }

  private generalToken: string;
  private companyToken: string;

  getCompanyToken() {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.append('username', 'FEUP'),
    body.append('password', 'qualquer1');
    body.append('company', 'BELAFLOR');
    body.append('instance', 'DEFAULT');
    body.append('grant_type', 'password');
    body.append('line', 'professional');
    console.log(body.toString());
    return this.http.post('http://192.168.56.100:299/WebApi/token', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded'}});
  }
}
