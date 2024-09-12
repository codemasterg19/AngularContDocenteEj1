import { Component, OnInit } from '@angular/core';
import { Producto } from '../../utils/producto';
import { CarritoService } from '../../services/carrito/carrito.service';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos/productos.service';
import { ActivatedRoute } from '@angular/router';
import { PaypalService } from '../../services/paypal/paypal.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, ], 
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  
  producto: Producto[] = [];
  cantidad: number = 1;

  constructor(private carritoService: CarritoService, private productosService: ProductosService, private route: ActivatedRoute, private paypalService: PaypalService) { }

  ngOnInit(): void {
    this.producto = this.carritoService.obtenerCarrito();
    this.route.queryParams.subscribe(params => {
      console.log(params['paymentId']);
    });
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
    this.paypalService.getAccessToken().subscribe(accessToken => {
      this.paypalService.createWebProfile(accessToken.access_token, `Pago-${Math.random()}`).subscribe(webProfile => {
        this.paypalService.createPayment(
          accessToken.access_token,
          webProfile.id,
          "http://localhost:4200/home",
          "http://localhost:4200/login"
        ).subscribe(payment => {
          console.log(payment.id);
          const approvalUrl = payment.links?.find(link => link.rel === 'approval_url')?.href;
          if (approvalUrl) {
            window.location.href = approvalUrl;
          } else {
            console.error('Approval URL not found');
          }
        });
      });
    });
  }
}
