import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from './products.service';
import { Product } from './products.model';
import { OrderFormComponent } from '../order-form/order-form.component';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.products = this.productService.getProducts();
  }

  onAddToCart(product: Product): void {
    this.productService.addToCart(product);
    console.log(`Added to cart: ${product.name}`);
  }

  onBuyNow(product: Product): void {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      width: '600px',
      data: { product: product } // Pass product data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The order form dialog was closed');
      if (result) {
        this.productService.buyProduct(product, result.paymentMode);
      }
    });
  }
  openAddProductDialog(): void {
    this.productService.openAddProductDialog();
  }
}
