import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  cartCount: number;
  @Input() IsInCheckout: boolean;
  @Input() IsInScanner: boolean;
  @Input() IsInInvoice: boolean;
  constructor(private productSvc: ProductsService, private router: Router ) {
   }

  /**
   * update cart count.
   */
  ngOnInit() {
    this.cartCount = 0;
    this.productSvc.cartCount$.subscribe(data => this.cartCount = data);
  }

  /**
   * navigate to scanner and clear cart.
   */
  clearAndRedirect(){
    this.productSvc.removeAll();
    this.router.navigateByUrl("/scanner");
  }

  /**
   * print the invoice.
   */
  print(){
    window.print();
  }
}
