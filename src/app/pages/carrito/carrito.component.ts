import { Component } from '@angular/core';
import { Producto } from '../../utils/producto';
import { CarritoService } from '../../services/carrito/carrito.service';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos/productos.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  
  producto: Producto[] = [];
  cantidad: number = 1;

  constructor(private carritoService: CarritoService, private productosService: ProductosService) { }

  ngOnInit(): void {
    this.producto = this.carritoService.obtenerCarrito();
  }

  incrementarCantidad(producto : Producto, cantidad: number): void {
    if (cantidad < producto.stock) {
      this.carritoService.actualizarCantidad(producto.id, cantidad + 1);
    } else {
      alert('No puedes agregar más de este producto. Stock máximo alcanzado.');
    }
  }

  decrementarCantidad(producto : Producto, cantidad: number): void {
    if (cantidad > 1) {
      this.carritoService.actualizarCantidad(producto.id, cantidad - 1);
    } else {
      alert('La cantidad no puede ser menor a 1.');
    }
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.producto = [];
    this.cantidad = 1;
  }

  calcularTotal(): number {
    return this.producto.reduce((total, producto) => total + producto.precio, 0);
  }

  pagar(): void {
    this.vaciarCarrito();
  }

}
