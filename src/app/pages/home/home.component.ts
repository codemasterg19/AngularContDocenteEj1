import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Producto } from '../../utils/producto';
import produtoData  from '../../../../public/json/productoData.json';
import { Router } from '@angular/router';

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  productos: Producto[] = produtoData as Producto[];

  ofertaProductos: Producto[] = [];

  constructor(private router: Router) { 
    this.selectOfertaProductos();
  }


  
  // Función para seleccionar dos productos aleatorios sin duplicados
  selectOfertaProductos() {
    const indices = new Set<number>();
    while (indices.size < 2) {
      indices.add(randomInt(this.productos.length));
    }
    this.ofertaProductos = Array.from(indices).map(index => this.productos[index]);
  }
 
  onClickproducto(producto: Producto): void{
    this.router.navigate(['/listaproducto', producto.id]);

  }
}