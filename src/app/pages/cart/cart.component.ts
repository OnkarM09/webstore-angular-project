import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: `cart.component.html`,
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [{
      product: "https://via.placeholder.com/150",
      name: "Snicker",
      price: 150,
      quantity: 1,
      id: 1
    },
    {
      product: "https://via.placeholder.com/150",
      name: "Snicker",
      price: 150,
      quantity: 2,
      id: 2
    }]
  };

  dataSource: Array<CartItem> = [];
  displayColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];

  constructor(private cartService: CartService,
    private httpClient : HttpClient) { }
  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe(data => {
      this.cart = data;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }
  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onSubstractQuantity(item: CartItem): void {
   this.cartService.removeQuantity(item);
  }
  onCheckout():void{
    this.httpClient.post('/http://localhost:4242/checkout',{
      items: this.cart.items
    }).subscribe(async(data : any)=>{
      let stripe = await loadStripe('pk_live_51OQjhHSDTBtZLVgQjZcWURr5MJA64i7XRaFJgR2IMvsYjgKtgbTTewiroymqd1Trx940FzxY0dVeI8FmnaYofJh700KsMXpUml')
      stripe?.redirectToCheckout({
        sessionId: data.id
      })
    });
  }
}
