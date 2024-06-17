export interface Product {
    id: number;
    name: string;
    quantity: number;
    imageUrl: string;
    category: string;
    price: number;
    added?: boolean; 
    purchased?:boolean;
    shipped?: boolean;
    paymentMode?: string;
  }
  