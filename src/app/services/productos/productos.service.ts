import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private url = 'public/json/productoData.json';
  constructor(private http: HttpClient) { }

  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.url);
  }

  createProductos(productos: Productos): Observable<Productos> {
  const httpHeaders = new HttpHeaders({
    "Content-Type": "application/json"});
    return this.http.post<Productos>(this.url, productos, {headers: httpHeaders});
}

updateProductos(productos: Productos): Observable<Productos> {
  const httpHeaders = new HttpHeaders({
    "Content-Type": "application/json"});
    return this.http.put<Productos>(`${this.url}/${productos.id}`, productos, {headers: httpHeaders});
}

deleteProductos(productos: Productos): Observable<Productos> {
  const httpHeaders = new HttpHeaders({
    "Content-Type": "application/json"});
    return this.http.delete<Productos>(`${this.url}/${productos.id}`);
}
}
  
