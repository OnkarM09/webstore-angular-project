import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/pages/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: `product-box.component.html`
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;

  constructor(){
    
  }
  ngOnInit(): void {
    console.log(this.product);
  }
  
  @Output() addToCarts = new EventEmitter();

  addToCart() : void{
    this.addToCarts.emit(this.product);
  }
}
