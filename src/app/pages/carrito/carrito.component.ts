import { Component } from '@angular/core';
import { Producto } from '../../utils/producto';
import { CarritoService } from '../../services/carrito/carrito.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carrito: Producto[] = [];

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.carrito = [];
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.precio, 0);
  }
}
