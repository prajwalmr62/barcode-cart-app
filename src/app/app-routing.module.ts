import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { InvoiceComponent } from './invoice/invoice.component';

/**
 * defined routes
 */
const routes: Routes = [
  {
    path:'scanner',
    component: ScannerComponent
  },
  {
    path:'checkout',
    component: CheckoutComponent
  },
  {
    path:'order',
    component: InvoiceComponent
  },
  {
    path:'',
    redirectTo:'scanner',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
