import { Component, OnInit } from '@angular/core';
import { ScanSettings, Barcode } from 'scandit-sdk';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {
  public settings = new ScanSettings({ enabledSymbologies: [Barcode.Symbology.EAN8, Barcode.Symbology.EAN13] });

  constructor(private productSvc: ProductsService) { }

  ngOnInit() {
  }

  /**
   * Scanned event
   * @param event event object from scanner
   */
  onScan(event: any){
    let productId = event.barcodes[0].data;
    this.productSvc.addProduct(productId, 1);

  }

  /**
   * scanner error
   * @param event error event.
   */
  onError(event: any){
    console.log(event);
  }
}
