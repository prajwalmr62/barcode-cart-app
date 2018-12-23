import { Component , OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  appTitle = "My Cart Co.";
  isInCheckout = false;
  isInScanner = false;
  isInInvoice = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute){
  }

  /**
   * subscribes to routing events and changes the navbar state.
   */
  ngOnInit(){
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).pipe(map(()=>{
      let child = this.activatedRoute.firstChild;
      while(child){
        if(child.firstChild){
          child = child.firstChild;
        }else if (child.snapshot){
          return child.snapshot;
        }else{
          return null;
        }
      }
      return null;
    })).subscribe(snapshot=>{
      this.isInCheckout = location.pathname.includes('/checkout');
      this.isInScanner = location.pathname.includes('/scanner');
      this.isInInvoice = location.pathname.includes('/order');
    })
  }
}
