import { Injectable } from '@angular/core';
import { Product } from './products.model'; // Ensure to import the Product interface

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {
  private cartItems: Product[] = [];
  private purchasedItems: Product[] = [];

  constructor() { }

  addToCart(product: Product) {
    this.cartItems.push(product);
  }

  getPurchasedItems() {
    return this.purchasedItems;
  }

  markAsPurchased(product: Product) {
    this.purchasedItems.push(product);
  }

  isInCart(product: Product): boolean {
    return this.cartItems.includes(product);
  }
}
