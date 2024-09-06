import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Producto } from '../../utils/producto';
import produtoData  from '../../../../public/json/productoData.json';
import { Router } from '@angular/router';
import { Productos, ProductosService } from '../../services/productos/productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-listaproducto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listaproducto.component.html',
  styleUrl: './listaproducto.component.css'
})
export class ListaproductoComponent {

  producto: Productos[] = [];
  form: FormGroup;

  constructor(private productosService: ProductosService, 
    private formBuilder: FormBuilder, private router: Router) {
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

        onClickProducto( producto: Productos): void{
          this.router.navigate(['/listaproducto', producto.id]);  
      
        }

}