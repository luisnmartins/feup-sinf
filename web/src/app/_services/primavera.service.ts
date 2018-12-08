import { Product } from './../_models/product';
import { AdminConsult, TransformedLine } from './../_models/responses';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { TokenRes, Order, OrderLine } from '@app/_models';
import { formatDate } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class PrimaveraService {

    private currentTokenSubject: BehaviorSubject<TokenRes>;
    public currentToken: Observable<TokenRes>;
    public interval: NodeJS.Timer;

    private currRoute = new BehaviorSubject<OrderLine[]|number>([]);

    constructor(private http: HttpClient) {
            this.currentTokenSubject = new BehaviorSubject<TokenRes>(JSON.parse(localStorage.getItem('currentToken')));
            this.currentToken = this.currentTokenSubject.asObservable();
            this.interval = setInterval(this.getToken, 1100000);
    }

    public get currentTokenValue(): TokenRes {
        return this.currentTokenSubject.value;
    }

    stopInterval() {
        clearInterval(this.interval);
    }

    async getToken() {
        const body = new URLSearchParams();
        body.append('username', 'FEUP'),
        body.append('password', 'qualquer1');
        body.append('company', 'DEMO');
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

    getECL(): Observable<AdminConsult> {
        return <Observable<AdminConsult>>this.http.post(`${environment.primaveraUrl}/Administrador/Consulta`,
            `"SELECT Cab.TipoEntidade as entityType,
            Cab.Serie as series,
            Cab.TipoDoc as docType,
            Cab.NumDoc as docNum,
            Cab.Data as date,
            Cab.Entidade as entity,
            Lin.NumLinha as lineNum,
            Lin.Artigo as reference,
            Lin.Quantidade as quantity,
            Lin.Armazem as warehouse,
            Lin.Localizacao as location,
            Art.Descricao as name,
            ISNULL(Art.StkActual, 0) as stock
            FROM CabecDoc as Cab
                join LinhasDoc as Lin on Cab.Id = Lin.IdCabecDoc
                join Artigo as Art on Lin.Artigo = Art.Artigo
            WHERE Cab.TipoDoc = 'ECL'"`
        , {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    getECF(): Observable<AdminConsult> {
        return <Observable<AdminConsult>>this.http.post(`${environment.primaveraUrl}/Administrador/Consulta`,
            `"SELECT Cab.TipoEntidade as entityType,
            Cab.Serie as series,
            Cab.TipoDoc as docType,
            Cab.NumDoc as docNum,
            Cab.DataDoc as date,
            Cab.Entidade as entity,
            Lin.NumLinha as lineNum,
            Lin.Artigo as reference,
            Lin.Quantidade as quantity,
            Lin.Armazem as warehouse,
            Lin.Localizacao as location,
            Art.Descricao as name,
            ISNULL(Art.StkActual, 0) as stock
            FROM CabecCompras as Cab
                join LinhasCompras as Lin on Cab.Id = Lin.IdCabecCompras
                join Artigo as Art on Lin.Artigo = Art.Artigo
            WHERE Cab.TipoDoc='ECF'"`
        , {
                headers: { 'Content-Type': 'application/json' }
        });
    }

    async completeRoute(lines: OrderLine[], type: 'Vendas' | 'Compras') {
        console.log('LINES: ', lines);
        console.log('TYPE: ', type);
        const formattedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
        console.log('DATE: ', formattedDate);
        try {
            const responses = await this.transformLines(lines, type, formattedDate);
            console.log('TRANSFORM LINES: ', responses);
            // TODO: Create new document
            let transferRes;
            switch (type) {
                case 'Compras':
                    transferRes = await this.createTransferFromReception(lines);
                    break;
                case 'Vendas':
                    transferRes = await this.createTransferToExpedition(lines);
                    break;
                default:
                    return Promise.reject(new Error('Unknown Route type detected. Route type should be on of {Vendas,Compras}'));
            }
            console.log('CREATE TRANSFER: ', transferRes);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    async transformLines(lines: OrderLine[], type: 'Vendas'|'Compras', formattedDate: string) {
        const responses = new Array(); // new Array<Promise<TransformedLine>>();
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const body = {
                TipoDoc: type === 'Compras' ? 'GR' : 'FA',
                Serie: line.series,
                Entidade: line.entity,
                TipoEntidade: line.entityType,
                DataDoc: formattedDate,
                DataVenc: formattedDate,
            };
            responses.push(await this.http.post(`
${environment.primaveraUrl}/${type}/
Docs/AdicionaLinhaTransformada/
${line.docType}/
${line.docNum}/
${line.lineNum}/
000/${line.series}`,
                body,
                { headers: { 'Content-Type': 'application/json' } }).toPromise());
        }
        return responses;
    }

    createDocument(lines: any[]): Promise<any> {
        // URL for ECL - {{apiUrl}}Vendas/Docs/CreateDocument
        // URL for ECF - {{apiUrl}}Compras/Docs/CreateDocument
        // body - tranformed line received from transfomr lines request
        return Promise.resolve();
    }

    async createTransferToExpedition(lines: OrderLine[]) {
        const origLines = [];
        lines.forEach(line => {
            origLines.push({
                Artigo: line.reference,
                Armazem: 'A1',
                Localizacao: 'A1.rececao',
                Lote: '',
                Quantidade: line.quantity,
                PrecUnit: 1.5,
                INV_EstadoOrigem: 'DISP',
                LinhasDestino:
                    [
                        {
                            Artigo: line.reference,
                            Armazem: line.warehouse,
                            Localizacao: line.location,
                            Lote: '',
                            Quantidade: line.quantity,
                            PrecUnit: 1.5,
                            INV_EstadoDestino: 'DISP'
                        }
                    ]
            });
        });
        return this.createTransfer([]);
    }

    async createTransferFromReception(lines: OrderLine[]) {
        const origLines = [];
        lines.forEach(line => {
            origLines.push({
                Artigo: line.reference,
                Armazem: line.warehouse,
                Localizacao: line.location,
                Lote: '',
                Quantidade: line.quantity,
                PrecUnit: 1.5,
                INV_EstadoOrigem: 'DISP',
                LinhasDestino:
                [
                    {
                        Artigo: line.reference,
                        Armazem: 'A1',
                        Localizacao: 'A1.expedição',
                        Lote: '',
                        Quantidade: line.quantity,
                        PrecUnit: 1.5,
                        INV_EstadoDestino: 'DISP'
                    }
                ]
            });
        });
        return this.createTransfer(origLines);
    }

    private createTransfer(origLines): Promise<any> {
        const body = {
            TipoDoc: 'TRA',
            Serie: 'A',
            Data: formatDate(new Date(), 'MM/dd/yyyy', 'en'),
            Moeda: 'EUR',
            LinhasOrigem: origLines
        };
        return this.http.post(
            `${environment.primaveraUrl}/Inventario/Transferencias/CreateTransfer`,
            body,
            { headers: { 'Content-Type': 'application/json' } }).toPromise();
    }

    createRoute(items: OrderLine[]) {
        // TODO - insert algorithm here
        this.currRoute.next(items);
    }

    clearRoute() {
        this.currRoute.next(0);
    }

    getRoute(): Observable<OrderLine[]|number> {
        return this.currRoute.asObservable();
    }

    parseOrderLines(lines: OrderLine[]): Order[] {
        const orders: Order[] = [];
        lines.forEach((line) => {
            const number = line.docNum;
            if (orders[number]) {
                orders[number].content.push({
                    name: line.name,
                    reference: line.reference,
                    quantity: line.quantity,
                    warehouse: line.warehouse,
                    stock: line.stock,
                    location: line.location,
                    origLine: line,
                });
            } else {
                orders[number] = <Order>{
                    docType: line.docType,
                    docNum: line.docNum,
                    supplier: line.entity,
                    date: new Date(line.date),
                    content: [<Product>{
                        name: line.name,
                        reference: line.reference,
                        quantity: line.quantity,
                        warehouse: line.warehouse,
                        stock: line.stock,
                        location: line.location,
                        origLine: line,
                    }]
                };
            }
        });
        return orders;
    }
}
