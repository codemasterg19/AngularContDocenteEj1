import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc

} from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Productos {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})

export class ProductosService {


  constructor(private firestore: Firestore) { }

  getProductos(): Observable<Productos[]> {
   const productosRef = collection(this.firestore, 'productos');
   return collectionData(productosRef, {idField: 'id'}) as Observable<Productos[]>
  }

  createProductos(producto: Productos): Promise<any> {  
    const productosRef = collection(this.firestore, 'productos');
    return addDoc(productosRef, producto);    }

  updateProductos(producto: Productos): Promise<any> {
    const docRef = doc(this.firestore, `productos/${producto.id}`);
    return updateDoc(docRef, {nombre : producto.nombre, descripcion: producto.descripcion, 
      precio: producto.precio, imagen: producto.imagen, stock: producto.stock});
  }

  deleteProductos(producto: Productos): Promise<any> {
    const productoRef = doc(this.firestore, `productos/${producto.id}`);
    return deleteDoc(productoRef);
  }


  } 



