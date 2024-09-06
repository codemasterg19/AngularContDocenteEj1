import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductosService } from '../../services/productos/productos.service';
import { Producto } from '../../utils/producto';
import { CarritoService } from '../../services/carrito/carrito.service';

@Component({
  selector: 'app-infoproducto',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './infoproducto.component.html',
  styleUrls: ['./infoproducto.component.css']
})
export class InfoproductoComponent implements OnInit {

  producto?: Producto;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private carritoService: CarritoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productosService.getProductoById(id).then(producto => {
          this.producto = producto;
        }).catch(error => {
          console.error("Error al obtener el producto: ", error);
        });
      }
    });
  }

  agregarAlCarrito(): void {
    if (this.producto) {
      this.carritoService.agregarProducto(this.producto);
      this.router.navigate(['/carrito']);
    }
  }
}
