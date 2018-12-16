export interface TokenRes {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface AdminConsult {
    DataSet: {
        Table: OrderLine[];
    };
    Query: string;
}

export interface OrderLine {
    series: string;
    docName: string;
    docType: string;
    docNum: string;
    entName: string;
    date: string;
    entity: string;
    entityType: string;
    lineNum: number;
    reference: string;
    name: string;
    quantity: number;
    warehouse: string;
    location: string;
    stock: number;
}

export interface TransformedLine {
    info: string;
}

export interface WarehouseLocation {
    warehouse: string;
    location: string;
    description: string;
}
