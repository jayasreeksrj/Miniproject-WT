import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './products.model';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([
    { id: 1, name: 'Laptop', quantity: 10, imageUrl: 'https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg', category: 'Electronics', price: 100000 },
    { id: 2, name: 'Apple Mobile', quantity: 20, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9J_-9MqLsMdC8mPGX7vjqpEyr2yZNZqVJA&s', category: 'Mobiles', price: 80000 },
    { id: 3, name: 'Samsung Mobile', quantity: 15, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxrXvuEFFUWrwcjHNfDUCCxVqfT9sBaBpzuQ&s', category: 'Mobiles', price: 70000 },
    { id: 4, name: 'Redmi Mobile', quantity: 30, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfN9wneKDg4Vy12i1emOJzjhwiylC24s5g1w&s', category: 'Mobiles', price: 50000 },
    { id: 5, name: 'Wired Headsets', quantity: 50, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQnxLUaTdSbsXpVMCl8CVvSENdq7FROuPIw&s', category: 'Headsets', price: 5000 },
    { id: 6, name: 'Semiconductors', quantity: 100, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgjuPAKKFIep_7wf9UGFXAtwF16axhf6B1aQ&s', category: 'Electronics', price: 10000 },
    { id: 7, name: 'Dresses', quantity: 25, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdGroOBlYpcoQ6-L6q8mAvMvQ-_caSTMT14A&s', category: 'Clothing', price: 800 },
    { id: 8, name: 'Wood', quantity: 40, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzPd2SS6u26ztbNAKxTqsupTu5lyuTer_cQQ&s', category: 'Home & Kitchen', price: 2000 },
    { id: 9, name: 'Airpods', quantity: 10, imageUrl: 'https://cdsassets.apple.com/live/7WUAS350/images/airpods/airpods-magsafe-charging-case-for-airpods-pro-2nd-generation-status-light-callout.png', category: 'Electronics', price: 1500 },
    { id: 10, name: 'Watch', quantity: 5, imageUrl: 'https://hmadmin.hamleys.in/product/493174788/665/493174788-1.jpg', category: 'Watches', price: 2000 },
    { id:11, name:'Shoes',quantity:10,imageUrl:'https://t3.ftcdn.net/jpg/06/12/00/18/360_F_612001823_TkzT0xmIgagoDCyQ0yuJYEGu8j6VNVYT.jpg',category:'Fashion',price:1000}
  ]);

  private cartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private shippedItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();
  cart$ = this.cartSubject.asObservable();
  shippedItems$ = this.shippedItemsSubject.asObservable();

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  getProducts(): Product[] {
    return this.productsSubject.value;
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((newProduct: Product) => {
      if (newProduct) {
        this.addProduct(newProduct);
      }
    });
  }

  addProduct(newProduct: Product): void {
    const currentProducts = this.productsSubject.value;
    newProduct.id = currentProducts.length + 1;
    const updatedProducts = [...currentProducts, newProduct];
    this.productsSubject.next(updatedProducts);
  }

  addToCart(product: Product): void {
    const currentCart = this.cartSubject.value;
    const existingProduct = currentCart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const cartProduct = { ...product, quantity: 1 };
      this.cartSubject.next([...currentCart, cartProduct]);
    }
  }

  removeFromCart(product: Product): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(item => item.id !== product.id);
    this.cartSubject.next(updatedCart);
  }

  buyProduct(product: Product, paymentMode: string): void {
    const currentProducts = this.productsSubject.value;
    const productIndex = currentProducts.findIndex(p => p.id === product.id);
    if (productIndex !== -1 && currentProducts[productIndex].quantity >= product.quantity) {
      currentProducts[productIndex].quantity -= product.quantity;
      this.productsSubject.next([...currentProducts]);

      if (paymentMode === 'cash'||'gpay') {
        this.addProductToShippedItems(product);
      }

      console.log(`Product bought: ${product.name}`);
      console.log('Payment mode:', paymentMode);
    } else {
      console.log(`Insufficient quantity for: ${product.name}`);
    }
  }
  

  private addProductToShippedItems(product: Product): void {
    const shippedItems = this.shippedItemsSubject.value;
    shippedItems.push(product);
    this.shippedItemsSubject.next([...shippedItems]);
    console.log(`Added to shipped items: ${product.name}`);
  }
}
