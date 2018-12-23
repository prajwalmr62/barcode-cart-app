import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { Subject } from 'rxjs';
import data from './productData';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  /**
   * This object is cart to which user updates the data.
   */
  productList = new Array<{ product: IProduct, qty: number }>();

  /**
   * items count in the cart. This is a subject upon which observable is created.
   */
  _cartCount = new Subject<number>();

  /**
   * Observable for cart's item count. Components will subscribe to this.
   */
  public cartCount$ = this._cartCount.asObservable();

  /**
   * constructor
   */
  constructor() { 
  }

  /**
   * to add a product to cart. If product already exists, it just updates the count.
   * @param productId Product ID to be added.
   * @param qty quantity of the product. 
   */
  public addProduct(productId: string, qty: number) : boolean {
    let product = this.findProduct(productId);
    if (product) {
      const existingProductId = this.productList.findIndex((cartObj)=> cartObj.product.id === productId);
      if(existingProductId >= 0){
        this.productList[existingProductId].qty = qty  + this.productList[existingProductId].qty;
      }else{
        this.productList.push({ product, qty });
      }
      this._cartCount.next(this.productList.length);
      return true;
    }
    return false;
  }

  /**
   * Remove a product from the cart.
   * @param productId Product's Id to be removed.
   */
  public removeProduct(productId: string): void {
    this.productList = this.productList.filter((cartObj) => cartObj.product.id !== productId);
    this._cartCount.next(this.productList.length);
  }

  /**
   * Change the quantity of the product added to the cart. If quantity is zero, item will be removed.
   * @param productId Product Id to be changed.
   * @param quantity quantity to be changed.
   */
  public changeQuantity(productId: string, quantity: number): void {
    const prodInd = this.productList.findIndex((obj)=> obj.product.id === productId);
    if(prodInd >=0 && quantity > 0){
      this.productList[prodInd].qty = quantity;
    } else{
      this.removeProduct(productId);
    }
  }

  /**
   * to check whether a product exists in the current list.
   * @param productId Id to be checked
   */
  public findProduct(productId: string) : IProduct{
    return data.find((prod) => prod.id === productId);
  }

  /**
   * calculate the total price
   * @returns total price
   */
  public calcTotal(){
    let totalPrice = 0;
    this.productList.forEach(obj => {
      totalPrice += obj.qty * obj.product.price.value;
    });
    return totalPrice;
  }

  /**
   * clears the cart.
   */
  public removeAll(){
    this.productList = new Array<{ product: IProduct, qty: number }>();
    this._cartCount.next(this.productList.length);
  }
}
