export interface Carrito {
  producto: Producto;
  cantidad: number;
}

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
}
