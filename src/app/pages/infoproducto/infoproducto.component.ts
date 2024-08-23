import { Component } from '@angular/core';
import produtoData  from '../../../../public/json/productoData.json';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Producto } from '../../utils/producto';



@Component({
  selector: 'app-infoproducto',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './infoproducto.component.html',
  styleUrl: './infoproducto.component.css'
})
export class InfoproductoComponent {

  producto?: Producto;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.producto = ((produtoData) as Producto[]).find((producto) => producto.id == Number(id));
    })
  }

}
