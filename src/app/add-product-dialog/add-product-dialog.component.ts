import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/products.model'; // Ensure Product interface or type is imported

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {

  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    if (this.productForm.valid) {
      const newProduct: Product = {
        id: 0, // Placeholder value, actual id assignment happens in service
        name: this.productForm.value.name,
        quantity: this.productForm.value.quantity,
        price: this.productForm.value.price,
        imageUrl: this.productForm.value.imageUrl,
        category: this.productForm.value.category
      };
      this.productService.addProduct(newProduct);
      this.dialogRef.close(newProduct);
    }
  }
}
