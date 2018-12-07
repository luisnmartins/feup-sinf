import { Product } from './product';

export interface Order {
    docType: string;
    docNum: string;
    supplier: string;
    date: Date;
    content: Product[];
}
