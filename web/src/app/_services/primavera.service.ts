import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { TokenRes } from '@app/_models';



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
        }, (err) => {
            console.log('error:', err);
        });
    }

    async getECL() {
        const req = new XMLHttpRequest();
        req.open('GET', `${environment.primaveraUrl}/Administrador/Consulta`);
        req.onload = (res) => {
            console.log(res);
        };
        req.setRequestHeader('Authorization', 'Bearer 3A3ElXddIaQLG0YQMHlV63WOvRmlOYKpzo5euQQRlWenO1h9j3Pavx_tjIcgtt4QnBhSD2jo9VlNe_Hzg3oiGcMHuH4y_ZiVKwawu9SD1xJpduggUkv0hqEFyDdBoNg5yKE6TaiDjZTrYfF8ei_qgxKbk4gdhaSfqHmaeUx3EaEYbrdu2bLVkQ8fqPkVBIbZUUQTI2ccCqBKPHjclEM35ZF592Oh3YFZ0_2-nMBHZcZfUhLTsL_IqSPEwQzmeIjoSmj3-H1srfg_5I9bG2xLzs-l2Q659nhBTOS6snoYvwTVa-fxYP4V3IdGnxjKmHCu');
        req.send('SELECT * FROM ArmazemLocalizacoes');
        // this.http.get(`${environment.primaveraUrl}/Administrador/Consulta`, {
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        // }).subscribe((res) => {
        //     console.log(res);
        // }, (err) => {
        //     console.log('error:', err);
        // });
    }

    async getECF() {
        this.http.get(`${environment.primaveraUrl}/Administrador/Consulta`).subscribe((res) => {
            console.log(res);
        }, (err) => {
            console.log('error:', err);
        });
    }
}
