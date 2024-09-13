import { Injectable } from '@angular/core';
import { Carrito, Producto } from '../../utils/producto';
import { Firestore, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Carrito[] = [];

  constructor( private firestore: Firestore) { }

  agregarProducto(producto: Producto, cantidad: number = 1): void {
    const existingItem = this.carrito.find(item => item.producto.id === producto.id);
    if (existingItem) {
      if (existingItem.cantidad + cantidad <= producto.stock) {
        existingItem.cantidad += cantidad;
      } else {
        alert('No puedes agregar más de este producto. Stock máximo alcanzado.');
      }
    } else {
      if (cantidad <= producto.stock) {
        this.carrito.push({ producto, cantidad });
      } else {
        alert('Stock agotado');
      }
    }
  }

  obtenerCarrito(): Carrito[] {
    return this.carrito;
  }

  vaciarCarrito(): void {
    this.carrito = [];
  }

  actualizarCantidad(id: string, nuevaCantidad: number): void {
    const item = this.carrito.find(item => item.producto.id === id);
    if (item && nuevaCantidad <= item.producto.stock) {
      item.cantidad = nuevaCantidad;
    } else {
      alert('Cantidad excede el stock disponible.');
    }
  }

  eliminarProducto(id: string): void {
    this.carrito = this.carrito.filter(item => item.producto.id !== id);
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }

}
