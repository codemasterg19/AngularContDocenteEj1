import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Producto } from '../../utils/producto';
import { Router, RouterModule } from '@angular/router';
import { ProductosService } from '../../services/productos/productos.service';

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  productos: Producto[] = [];
  ofertaProductos: Producto[] = [];

  constructor(private router: Router, private productosService: ProductosService) {
  }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe((productos) => {
      this.productos = productos;
      this.selectOfertaProductos();
    })
  }
  
  // Función para seleccionar dos productos aleatorios sin duplicados
  selectOfertaProductos() {
    const numProductosOferta = Math.ceil(this.productos.length * 0.3);
    const indices = new Set<number>();
    while (indices.size < numProductosOferta && this.productos.length > 0) {
      indices.add(randomInt(this.productos.length));
    }
    this.ofertaProductos = Array.from(indices).map(index => this.productos[index]);
  }

}