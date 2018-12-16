import { Product } from './product';

export interface Order {
    docType: string;
    docNum: string;
    supplier: string;
    date: Date;
    entName: string;
    content: Product[];
    contentString: string;
}
