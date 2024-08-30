import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Productos, ProductosService } from '../../services/productos/productos.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
        description: ["", Validators.required, Validators.minLength(20)]
      })
     }

     ngOnInit(): void {
      this.productosService.getProductos().subscribe((productos) => {
        this.producto = productos;
      })
    }

    onSubmit(): void {
      const producto = this.form.value;
      if(this.form.valid){
        this.productosService.createProductos(producto).subscribe((producto) => {
          this.producto.unshift(producto);
          this.form.reset();
        });
      }
    } 

    updateproducto(producto: Productos): void {
      if(this.form.invalid) return; 
      const newProducto={
      ...producto,
    ...this.form.value    
  };
  this.productosService.updateProductos(newProducto).subscribe((producto) => {
    const index = this.producto.findIndex(p => p.id === producto.id);
    this.producto[index] = producto;
  });

  }

  deleteproducto(producto: Productos): void {
    this.productosService.deleteProductos(producto).subscribe(() => {
      this.producto = this.producto.filter(p => p.id !== producto.id);
    });
  }

}
