import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
  cartCount: number;
  productList: any;
  totalPrice: number;
  constructor(private productSvc: ProductsService) {
    this.productList = this.productSvc.productList;
    this.cartCount = this.productSvc.productList.length;
    this.calcTotal();
    this.productSvc.cartCount$.subscribe(data=>{
      this.cartCount = data;
      this.productList = this.productSvc.productList;
      this.calcTotal();
    })
   }

   /**
    * calculate total price.
    */
  ngOnInit() {
    this.calcTotal();
  }

  /**
   * change the count of the item in cart.
   * @param productId Product id count
   * @param event change event
   */
  objectCountChanged(productId: string, event: any ){
    let qty = event.target.value;

    if(!qty){
      return this.productSvc.removeProduct(productId);
    }

    this.productSvc.changeQuantity(productId, qty);
    this.calcTotal();
  }

  /**
   * remove an item from cart.
   * @param productId product ID to be removed.
   */
  removeFromList(productId: string){
    this.productSvc.removeProduct(productId);
    this.calcTotal();
  }

  /**
   * calculate total price.
   */
  public calcTotal(){
    this.totalPrice = this.productSvc.calcTotal();
  }
}
