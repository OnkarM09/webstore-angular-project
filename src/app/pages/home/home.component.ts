import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
const ROWS_HEIGHT : {[id:number] : number} ={1 : 400, 
3: 355,
4: 350}
@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`
})
export class HomeComponent implements OnInit, OnDestroy {

  cols = 3;
  category : string  | undefined;
  rowHeight =ROWS_HEIGHT[this.cols];
  products : Array<Product> | undefined;
  sort = 'desc';
  count= 12;
  productSubscription  : Subscription | undefined;
  constructor(
    private cartService : CartService,
    private storeService : StoreService,
  ){}

  ngOnInit() : void {
    
    this.getProducts();
    console.log(this.getProducts());
  }

  ngOnDestroy(): void {
    if(this.productSubscription){
      this.productSubscription.unsubscribe();
    }    
  }

  getProducts() : void{
   this.productSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe((_products) => {
    this.products = _products;
    console.log(this.products)
  })  
}
  onColumnsCountChange(colsNumber : number) :void{
    this.cols = colsNumber;
    this.rowHeight =ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCat : string) : void{
    this.category = newCat;
    this.getProducts();
  }
  onAddCart(product :Product) : void{
    this.cartService.addToCart({
      product : product.image,
      name : product.title,
      price : product.price,
      quantity : 1,
      id : product.id
    })
  }
  onItemsCountChange(countNum : number) : void{
    this.count = countNum;
    this.getProducts();
  }
  onSortChange(sorting : string) : void{
    this.sort = sorting;
    this.getProducts();
  }
}
