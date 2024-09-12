import { Component, OnInit } from '@angular/core';
import { Producto } from '../../utils/producto';
import { CarritoService } from '../../services/carrito/carrito.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PaypalService } from '../../services/paypal/paypal.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, ], 
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: Producto[] = [];

  constructor(
    private carritoService: CarritoService,
    private route: ActivatedRoute,
    private paypalService: PaypalService
  ) {}

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();
    this.route.queryParams.subscribe(params => {
      console.log(params['paymentId']);
    });
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.carrito = [];
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.precio, 0);
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
