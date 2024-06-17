import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/products.model';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  onRemoveFromCart(product: Product): void {
    this.productsService.removeFromCart(product);
    console.log(`Removed from cart: ${product.name}`);
  }
}
