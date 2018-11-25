import { Product } from './product';
export interface Order {
    name: string;
    supplier: string;
    date: Date;
    content: Product[];
}
