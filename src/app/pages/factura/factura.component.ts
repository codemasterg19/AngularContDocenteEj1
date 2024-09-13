import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito/carrito.service';
import { Carrito } from '../../utils/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent {
  carrito: Carrito[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService, private router: Router) { }

  ngOnInit(): void {
    // Obtiene el carrito desde el servicio
    this.carrito = this.carritoService.obtenerCarrito();
    this.total = this.carritoService.calcularTotal();
  }

  seguirComprando(): void {
    this.router.navigate(['/listaproducto']);
  }
}
