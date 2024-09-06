import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Productos, ProductosService } from '../../services/productos/productos.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  producto: Productos[] = [];
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
        this.producto = productos;
      })
    }

    addProducto(): void {
        if(this.form.invalid)return;{
        this.productosService.createProductos(this.form.value)
         .then((producto) => {
           this.producto.push(producto);
           this.form.reset();
         })
         .catch((error) => {
           console.error(error);
         });
        }
    } 

    updateProducto(producto: Productos): void {
      if(this.form.invalid)return;
        const newProducto = {
          ...producto,...this.form.value};
          this.productosService.updateProductos(newProducto)
          .then(() =>{
            const index = this.producto.findIndex(p => p.id === newProducto.id);
            this.producto[index] = newProducto;
      })
      .catch((error) => console.log(error));
      } 
    

      deleteProducto(producto: Productos): void {
        this.productosService.deleteProductos(producto)
        .then(() => {
          this.producto = this.producto.filter(p => p.id !== producto.id);
        })
        .catch(error => console.log(error));  
        }


}