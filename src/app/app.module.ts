import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ScanditSdkModule } from "scandit-sdk-angular";
import { ScannerComponent } from './scanner/scanner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProductsService } from './services/products.service';
import { ProductListingComponent } from './product-listing/product-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    ScannerComponent,
    NavbarComponent,
    CheckoutComponent,
    InvoiceComponent,
    ProductListingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ScanditSdkModule.forRoot("YOU_LICENSE_HEY_HERE", "https://websdk.scandit.com/")
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
