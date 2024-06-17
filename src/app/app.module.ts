import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ShippedItemsComponent } from './shipped-items/shipped-items.component';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component'; 
import { AuthService } from './guard/auth.service';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './products/products.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductCartService } from './products/product-cart.service';
import { OrderFormComponent } from './order-form/order-form.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GooglePayButtonModule } from '@google-pay/button-angular';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProductsComponent,
    AddToCartComponent,
    ShippedItemsComponent,
    AddProductDialogComponent,
    OrderFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    GooglePayButtonModule
  ],
  providers: [ProductsService, provideAnimationsAsync()],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
