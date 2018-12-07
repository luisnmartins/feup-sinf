import { OrderLine } from './responses';

export interface Product {
    name: string;
    reference: string;
    quantity: number;
    warehouse: string;
    stock: number;
    location?: string;
    origLine: OrderLine;
}
