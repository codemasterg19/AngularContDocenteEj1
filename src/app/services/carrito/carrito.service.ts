import { Injectable } from '@angular/core';
import { Producto } from '../../utils/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Producto[] = [];

  constructor() { }

  agregarProducto(producto: Producto, cantidad: number = 1): void {
    const existingItem = this.carrito.find(item => item.id === producto.id);
    if (existingItem) {
      existingItem.stock += cantidad;
    } else {
      this.carrito.push(producto);
    }
  }

  obtenerCarrito(): Producto[] {
    return this.carrito;
  }

  vaciarCarrito(): void {
    this.carrito = [];
  }

  actualizarCantidad(id: string, nuevaCantidad: number): void {
    const item = this.carrito.find(item => item.id === id);
    if (item) {
      item.stock = nuevaCantidad;
    }
  }
}
