import { AuthenticationService } from './authentication.service';
import { Product } from './../_models/product';
import { AdminConsult, WarehouseLocation } from './../_models/responses';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { TokenRes, Order, OrderLine } from '@app/_models';
import { formatDate } from '@angular/common';
import { RouteService } from './route.service';

@Injectable({ providedIn: 'root' })
export class PrimaveraService {

    private currentTokenSubject: BehaviorSubject<TokenRes>;
    public currentToken: Observable<TokenRes>;
    private currUser: any;
    public locations: WarehouseLocation[] = [];
    public interval;

    private currRoute = new BehaviorSubject<any>([]);

    constructor(private http: HttpClient,
        private route: RouteService,
        private authenticationService: AuthenticationService,
    ) {
        this.currentTokenSubject = new BehaviorSubject<TokenRes>(JSON.parse(localStorage.getItem('currentToken')));
        this.currentToken = this.currentTokenSubject.asObservable();
    }

    public get currentTokenValue(): TokenRes {
        return this.currentTokenSubject.value;
    }

    startInterval() {
        this.interval = setInterval(this.getToken.bind(this), 1100000);
    }

    stopInterval() {
        clearInterval(this.interval);
        this.currentTokenSubject.next(null);
    }

    async getToken() {
        const currUser = this.authenticationService.currentUserValue;
        console.log('REQUESTING TOKEN');
        const body = new URLSearchParams();
        body.append('username', 'FEUP'),
            body.append('password', 'qualquer1');
        console.log('COMPANY: ', currUser.company);
        body.append('company', currUser.company);
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
            (Lin.Quantidade - LinStat.QuantTrans) as quantity,
            Lin.Armazem as warehouse,
            Lin.Localizacao as location,
            Art.Descricao as name,
            Ent.nome as entName,
            ISNULL(Art.StkActual, 0) as stock
            FROM CabecDoc as Cab
                join LinhasDoc as Lin on Cab.Id = Lin.IdCabecDoc
                join Artigo as Art ON Lin.Artigo = Art.Artigo
                join CabecDocStatus as CabStat ON Cab.Id = CabStat.IdCabecDoc
                join linhasdocstatus as LinStat ON LinStat.idlinhasdoc = Lin.id
                join clientes as Ent ON Ent.cliente = Cab.Entidade
            WHERE Cab.TipoDoc = 'ECL'
            AND CabStat.estado = 'P'"`
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
            (Lin.Quantidade - LinStat.QuantTrans) as quantity,
            Lin.Armazem as warehouse,
            Lin.Localizacao as location,
            Art.Descricao as name,
            Ent.nome as entName,
            ISNULL(Art.StkActual, 0) as stock
            FROM CabecCompras as Cab
                join LinhasCompras as Lin on Cab.Id = Lin.IdCabecCompras
                join Artigo as Art on Lin.Artigo = Art.Artigo
                join CabecComprasStatus as CabStat ON Cab.id = CabStat.IdCabecCompras
                join linhascomprasstatus as LinStat ON LinStat.idlinhascompras = Lin.id
                join fornecedores as Ent ON Ent.fornecedor = Cab.Entidade
            WHERE Cab.TipoDoc='ECF'
            AND CabStat.estado = 'P'"`
            , {
                headers: { 'Content-Type': 'application/json' }
            });
    }

    async getLocations(): Promise<WarehouseLocation[]> {
        try {
            const response = await <any>(this.http.post(`${environment.primaveraUrl}/Administrador/Consulta`,
                `"Select Armazem, Localizacao, Descricao from ArmazemLocalizacoes"`
                , {
                    headers: { 'Content-Type': 'application/json' }
                }).toPromise());
            const locations = response.DataSet.Table;
            locations.forEach(location => {
                this.locations.push({
                    warehouse: location.Armazem,
                    location: location.Localizacao,
                    description: location.Descricao,
                });
            });
            console.log(this.locations);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    async completeRoute(lines: OrderLine[], type: 'Vendas' | 'Compras') {
        console.log('LINES: ', lines);
        console.log('TYPE: ', type);
        const formattedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
        console.log('DATE: ', formattedDate);
        try {
            const responses = await this.transformLines(lines, type, formattedDate);
            console.log('TRANSFORM LINES: ', responses);
            const documents = this.concatTransfLines(responses);
            console.log('NEW DOCUMENTS: ', documents);
            let transferRes;
            let completeDocs;
            switch (type) {
                case 'Compras':
                    this.setReceptionLocation(documents);
                    completeDocs = await this.fillRelatedData(documents, 'Compras');
                    console.log('COMPLETE DOCS: ', completeDocs);
                    await this.createPurchaseDocument(completeDocs);
                    console.log('COMPLETED PURCHASES DOCS');
                    transferRes = await this.createTransferFromReception(lines);
                    console.log('CREATE TRANSFER: ', transferRes);
                    break;
                case 'Vendas':
                    completeDocs = await this.fillRelatedData(documents, 'Vendas');
                    console.log('COMPLETE DOCS: ', completeDocs);
                    await this.createSalesDocument(completeDocs);
                    console.log('COMPLETED SALES DOCS');
                    // transferRes = await this.createTransferToExpedition(lines);
                    break;
                default:
                    return Promise.reject(new Error('Unknown Route type detected. Route type should be on of {Vendas,Compras}'));
            }
            this.clearRoute();
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    async transformLines(lines: OrderLine[], type: 'Vendas' | 'Compras', formattedDate: string) {
        const responses = new Array(); // new Array<Promise<TransformedLine>>();
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.quantity === 0) {
                continue;
            }
            const body = {
                TipoDoc: type === 'Compras' ? 'VGR' : 'GR',
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
000/${line.series}/
${line.quantity}`,
                body,
                { headers: { 'Content-Type': 'application/json' } }).toPromise());
        }
        return responses;
    }

    concatTransfLines(transfLines: any[]): any[] {
        const completeDocuments: any[] = [];
        transfLines.forEach((line) => {
            if (completeDocuments[line.Entidade]) {
                console.log('PUSHING: ', line.Linhas);
                completeDocuments[line.Entidade].Linhas.push(...line.Linhas);
            } else {
                console.log('NEW DOC');
                completeDocuments[line.Entidade] = line;
            }
        });
        return completeDocuments;
    }

    async createSalesDocument(documents): Promise<any[]> {
        // URL for ECL - {{apiUrl}}Vendas/Docs/CreateDocument
        const responses: any[] = [];
        for (const key in documents) {
            if (documents.hasOwnProperty(key)) {
                const doc = documents[key];
                responses.push(await this.http.post(`${environment.primaveraUrl}/Vendas/Docs/Actualiza`,
                    doc,
                    { headers: { 'Content-Type': 'application/json' } }).toPromise());
            }
        }
        return responses;
    }

    async fillRelatedData(documents, type): Promise<any[]> {
        const responses: any[] = [];
        const keys = Object.keys(documents);
        for (let i = 0; i < keys.length; i++) {
            const doc = documents[keys[i]];
            responses.push(await this.http.post(`${environment.primaveraUrl}/${type}/Docs/PreencheDadosRelacionados/`,
                doc,
                { headers: { 'Content-Type': 'application/json' } }).toPromise());
        }
        return responses;
    }

    setReceptionLocation(documents) {
        for (const key in documents) {
            if (documents.hasOwnProperty(key)) {
                const doc = documents[key];
                doc.NumDocExterno = 1;
                for (const line of doc.Linhas) {
                    line.Armazem = 'RECEP';
                    line.Localizacao = 'RECEP';
                }
            }
        }
    }

    async createPurchaseDocument(documents: object): Promise<any[]> {
        // URL for ECF - {{apiUrl}}Compras/Docs/CreateDocument
        const responses: any[] = [];
        for (const key in documents) {
            if (documents.hasOwnProperty(key)) {
                const doc = documents[key];
                responses.push(await this.http.post(`${environment.primaveraUrl}/Compras/Docs/Actualiza`,
                    doc,
                    { headers: { 'Content-Type': 'application/json' } }).toPromise());
            }
        }
        return responses;
    }

    async createTransferFromReception(lines: OrderLine[]) {
        const origLines = [];
        lines.forEach(line => {
            origLines.push({
                Artigo: line.reference,
                Armazem: 'RECEP',
                Localizacao: '',
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
        return this.createTransfer(origLines);
    }

    async createTransferToExpedition(lines: OrderLine[]) {
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
                            Localizacao: 'A1.rececao',
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
        console.log(body);
        return this.http.post(
            `${environment.primaveraUrl}/Inventario/Transferencias/CreateTransfer`,
            body,
            { headers: { 'Content-Type': 'application/json' } }).toPromise();
    }

    createRoute(items: OrderLine[]) {
        // TODO - insert algorithm here
        // this.currRoute.next(items);
        this.currRoute.next(this.route.runAlgorithm(this.currRoute, items));
    }

    clearRoute() {
        this.currRoute.next(0);
    }

    getRoute(): Observable<any> {
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
                    entName: line.entName,
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

    addContentString(order: Order) {
        const content = [];
        content.push(order.supplier);
        content.push(order.entName);
        content.push(order.docNum);
        order.content.forEach((product: Product) => {
            content.push(product.location, product.name, product.reference, product.warehouse);
        });
        order.contentString = content.join(';').toLowerCase();
    }
}
