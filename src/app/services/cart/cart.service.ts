import { Injectable } from '@angular/core';
import { Producto } from '../../utils/producto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Producto[] = [];

  constructor() {}

  getCartItems(): Producto[] {
    return this.cart;
  }

  addToCart(producto: Producto): void {
    const existingProduct = this.cart.find((p) => p.id === producto.id);
    if (existingProduct) {
      existingProduct.stock += producto.stock;
    } else {
      this.cart.push({ ...producto });
    }
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, producto) => total + producto.precio * producto.stock, 0);
  }

  clearCart(): void {
    this.cart = [];
  }
}
