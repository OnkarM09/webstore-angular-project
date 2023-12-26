import { CartService } from 'src/app/services/cart.service';
import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/pages/models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: `./header.component.html`,
})
export class HeaderComponent {
  private _cart : Cart ={items :[]};
  itemsQuantitiy = 0;

  @Input() 
  get cart() : Cart {
    return this._cart;
  }

  set cart(cart : Cart){
    this._cart = cart;
    this.itemsQuantitiy = cart.items
    .map(item => item.quantity)
    .reduce((acc, current)=> acc + current, 0)
  }
  constructor(private cartService : CartService){

  }
  getTotal(items: Array<CartItem>) : number {
   return this.cartService.getTotal(items); 
  }
  clearCart():void{
    this.cartService.clearCart();
  }
}
