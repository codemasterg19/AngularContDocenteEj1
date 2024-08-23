import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Producto } from '../../utils/producto';
import produtoData  from '../../../../public/json/productoData.json';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listaproducto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listaproducto.component.html',
  styleUrl: './listaproducto.component.css'
})
export class ListaproductoComponent {

  productos: Producto[] = produtoData as Producto[];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onClickButton(): void{
    console.log("botón presionado");
  }

  onClickProducto( producto: Producto): void{
    this.router.navigate(['/listaproducto', producto.id]);  

  }

}
