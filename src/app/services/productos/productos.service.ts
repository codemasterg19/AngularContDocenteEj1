import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc

} from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../../utils/producto';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {


  constructor(private firestore: Firestore) { }

  getProductos(): Observable<Producto[]> {
   const productosRef = collection(this.firestore, 'productos');
   return collectionData(productosRef, {idField: 'id'}) as Observable<Producto[]>
  }

  createProductos(producto: Producto): Promise<any> {  
    const productosRef = collection(this.firestore, 'productos');
    return addDoc(productosRef, producto);    }

  updateProductos(producto: Producto): Promise<any> {
    const docRef = doc(this.firestore, `productos/${producto.id}`);
    return updateDoc(docRef, {nombre : producto.nombre, descripcion: producto.descripcion, 
      precio: producto.precio, imagen: producto.imagen, stock: producto.stock});
  }

  deleteProductos(producto: Producto): Promise<any> {
    const productoRef = doc(this.firestore, `productos/${producto.id}`);
    return deleteDoc(productoRef);
  }

  getProductoById(id: string): Promise<Producto | undefined> {
    const productoRef = doc(this.firestore, `productos/${id}`);
    return getDoc(productoRef).then(docSnap => {
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Producto;
      } else {
        return undefined;
      }
    });
  }
} 



