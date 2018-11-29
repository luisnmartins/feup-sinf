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
    type: string;
    date: string;
    supplier: string;
    reference: string;
    name: string;
    quantity: number;
    warehouse: string;
    location: string;
    stock: number;
}
