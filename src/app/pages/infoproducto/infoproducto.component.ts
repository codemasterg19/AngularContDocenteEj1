import { Component } from '@angular/core';
import produtoData  from '../../../../public/json/productoData.json';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Producto } from '../../utils/producto';
import { CarritoService } from '../../services/carrito/carrito.service';



@Component({
  selector: 'app-infoproducto',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './infoproducto.component.html',
  styleUrl: './infoproducto.component.css'
})
export class InfoproductoComponent {

  producto?: Producto;

  constructor(private route: ActivatedRoute, private carritoService: CarritoService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.producto = ((produtoData) as Producto[]).find((producto) => producto.id == Number(id));
    })
  }

  agregarAlCarrito(): void {
    if (this.producto) {
      this.carritoService.agregarProducto(this.producto);
      this.router.navigate(['/carrito']);
    }
  }

}
