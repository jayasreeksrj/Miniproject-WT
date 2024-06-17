import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Product } from '../products/products.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  products:any=[];
  paymentMode:String='';
  selectedProductName:String='';
  constructor(
    public dialogRef: MatDialogRef<OrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) {
    if (data && data.product) {
      this.products = [data.product]; // Add the initial product to products array
      this.selectProduct(data.product); // Select the initial product
    }
  }

  onSubmit(orderForm: NgForm): void {
    this.dialogRef.close(orderForm.value);
  }
  selectProduct(product: any) {
    this.selectedProductName = product.name;
  }
}

