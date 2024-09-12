import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductosService } from '../../services/productos/productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../utils/producto';


@Component({
  selector: 'app-listaproducto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listaproducto.component.html',
  styleUrl: './listaproducto.component.css'
})
export class ListaproductoComponent {

  productos: Producto[] = [];
  form: FormGroup;

  constructor(private productosService: ProductosService, 
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        nombre: ["", Validators.required],
        imagen: ["", Validators.required],
        precio: ["", Validators.required],
        stock: ["", Validators.required],
        descripcion: ["", Validators.required, Validators.minLength(20)]
      })
     }

     ngOnInit(): void {
      this.productosService.getProductos().subscribe((productos) => {
        this.productos = productos;
      })
    }

    addProducto(): void {
        if(this.form.invalid)return;{
        this.productosService.createProductos(this.form.value)
         .then((productos) => {
           this.productos.push(productos);
           this.form.reset();
         })
         .catch((error) => {
           console.error(error);
         });
        }
    } 

    updateProducto(producto: Producto): void {
      if(this.form.invalid)return;
        const newProducto = {
          ...producto,...this.form.value};
          this.productosService.updateProductos(newProducto)
          .then(() =>{
            const index = this.productos.findIndex(p => p.id === newProducto.id);
            this.productos[index] = newProducto;
      })
      .catch((error) => console.log(error));
      } 
    

      deleteProducto(producto: Producto): void {
        this.productosService.deleteProductos(producto)
        .then(() => {
          this.productos = this.productos.filter(p => p.id !== producto.id);
        })
        .catch(error => console.log(error));  
        }

}