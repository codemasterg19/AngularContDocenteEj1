import { Injectable } from '@angular/core';
import { Producto } from '../../utils/producto';

interface CarritoItem {
  id: string;
  producto: Producto;
  precio: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: Producto[] = [];

  constructor() { }

  agregarProducto(producto: Producto): void {
    this.carrito.push(producto);
  }

  obtenerCarrito(): Producto[] {
    return this.carrito;
  }

  vaciarCarrito(): void {
    this.carrito = [];
  }
}
