import { Component, OnInit } from '@angular/core';
import { Carrito, Producto } from '../../utils/producto';
import { CarritoService } from '../../services/carrito/carrito.service';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos/productos.service';
import { ActivatedRoute } from '@angular/router';
import { PaypalService } from '../../services/paypal/paypal.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{
  
  carrito: Carrito[] = [];

  constructor(private carritoService: CarritoService, private productosService: ProductosService, private route: ActivatedRoute, private paypalService: PaypalService) { }

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();
    this.route.queryParams.subscribe(params => {
      console.log(params['paymentId']);
    });
  }

  incrementarCantidad(producto : Producto, cantidad: number): void {
    if (cantidad < producto.stock) {
      this.carritoService.actualizarCantidad(producto.id, cantidad + 1);
      this.carrito = this.carritoService.obtenerCarrito();
    } else {
      alert('No puedes agregar más de este producto. Stock máximo alcanzado.');
    }
  }

  decrementarCantidad(producto : Producto, cantidad: number): void {
    if (cantidad > 1) {
      this.carritoService.actualizarCantidad(producto.id, cantidad - 1);
      this.carrito = this.carritoService.obtenerCarrito();
    } else {
      alert('La cantidad no puede ser menor a 1.');
    }
  }

  eliminarProducto(id: string): void {
    this.carritoService.eliminarProducto(id);
    this.carrito = this.carritoService.obtenerCarrito(); // Actualizar vista
  }
  
  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.carrito = [];
  }

  calcularTotal(): number {
    return this.carritoService.calcularTotal();
  }

  pagar(): void {
    const total = this.calcularTotal();
    this.paypalService.getAccessToken().subscribe(accessToken => {
      this.paypalService.createWebProfile(accessToken.access_token, `Pago-${Math.random()}`).subscribe(webProfile => {
        this.paypalService.createPayment(
          accessToken.access_token,
          webProfile.id,
          this.carrito,
          total.toString(), // Usa el total dinámico
          "USD", // Cambia la moneda según sea necesario
          "http://localhost:4200/home",
          "http://localhost:4200/login"
        ).subscribe(payment => {
          console.log(payment.id);
          const approvalUrl = payment.links?.find(link => link.rel === 'approval_url')?.href;
          if (approvalUrl) {
            window.location.href = approvalUrl;
            this.actualizarStock();
            this.vaciarCarrito();
          } else {
            console.error('URL de aprobación no encontrada');
          }
        });
      });
    });
  }

  actualizarStock(): void {
    this.carrito.forEach(item => {
      const nuevoStock = item.producto.stock - item.cantidad;
      this.productosService.updateProductoStock(item.producto.id, nuevoStock).then(() => {
        console.log(`Stock actualizado para ${item.producto.nombre}`);
      }).catch(error => {
        console.error(`Error actualizando el stock para ${item.producto.nombre}:`, error);
      });
    });
  }

}
