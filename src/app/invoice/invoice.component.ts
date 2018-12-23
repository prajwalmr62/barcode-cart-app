import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  productList: any;

  totalPrice: number;
  totalVat: number;
  totalAmount: number;
  constructor(private productSvc: ProductsService) { }

  /**
   * Subscribe to the cart and get init prices.
   */
  ngOnInit() {
    this.productList = this.productSvc.productList;
    this.getPrice();
    this.productSvc.cartCount$.subscribe(data=>{
      this.productList = this.productSvc.productList;
      this.getPrice();
    })
  }

  /**
   * calculate price, vat, and total price.
   */
  getPrice(){
    this.totalPrice = this.productSvc.calcTotal();
    this.totalVat = Math.round(this.totalPrice*0.05 * 100)/100;
    this.totalAmount = (Math.round(this.totalPrice*1.05 * 100)/100);
  }
}
