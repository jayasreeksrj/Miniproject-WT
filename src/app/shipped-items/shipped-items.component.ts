// shipped-items.component.ts

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../products/products.model';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-shipped-items',
  templateUrl: './shipped-items.component.html',
  styleUrls: ['./shipped-items.component.css']
})
export class ShippedItemsComponent implements OnInit {
  shippedItems$!: Observable<Product[]>; // Initialize with !

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.shippedItems$ = this.productsService.shippedItems$;
  }
}
