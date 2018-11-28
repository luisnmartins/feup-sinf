import { Product } from './product';
export interface Order {
    type: string;
    supplier: string;
    date: Date;
    content: Product[];
}
