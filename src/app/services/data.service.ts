import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private purchasedProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  products$ = this.productsSubject.asObservable();
  purchasedProducts$ = this.purchasedProductsSubject.asObservable();
  users$ = this.usersSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() { }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  addUser(user: User): void {
    const users = [...this.usersSubject.value, user];
    this.usersSubject.next(users);
  }

  getUserCount(): number {
    return this.usersSubject.value.length;
  }

  addProduct(product: Product): void {
    const products = [...this.productsSubject.value, product];
    this.productsSubject.next(products);
  }

  getProducts(): Product[] {
    return this.productsSubject.value;
  }

  getProductCount(): number {
    return this.productsSubject.value.length;
  }

  purchaseProduct(product: Product): void {
    const purchasedProducts = [...this.purchasedProductsSubject.value, product];
    this.purchasedProductsSubject.next(purchasedProducts);
  }

  getPurchasedCount(): number {
    return this.purchasedProductsSubject.value.length;
  }

  getTopBrandsCount(): number {
    const categories = this.productsSubject.value.map(p => p.category);
    return new Set(categories).size;
  }
}

interface User {
  name: string;
  email?: string;
  password?: string;
}

interface Product {
  name: string;
  category: string;
}
