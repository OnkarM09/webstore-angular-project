import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../pages/models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({
    items: []
  });
  constructor(private snackBar: MatSnackBar) {

  }
  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this.snackBar.open('1 Item added to cart', 'Okay', { duration : 3000});
    console.log(this.cart.value);
  }
  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart() : void{
    this.cart.next({ items : []});
    this.snackBar.open('Cart is clear', 'Okay', { duration : 3000});
  }
  removeFromCart(item : CartItem, updated = true) : Array<CartItem> {
    const filterItems = this.cart.value.items.filter((_item) => _item.id != item.id);
   if(updated) {
    this.cart.next({ items: filterItems });
    this.snackBar.open('Cart has been removed.', 'Okay', { duration : 3000});
   }
   return filterItems;
  }
  removeQuantity(item : CartItem) : void {
    let itemRemoval : CartItem | undefined;
    let filteredItems = this.cart.value.items.filter((_item) => {
      if(item.id === _item.id){
        _item.quantity --;
        if(_item.quantity ===0){
          itemRemoval =_item;
        }
      }
      return _item;
    });

    if(itemRemoval){
      filteredItems = this.removeFromCart(itemRemoval, false);
    }
    this.cart.next({items: filteredItems})
    this.snackBar.open('1 Item removed from card', 'Okay', {duration : 3000});
    
  }
}
