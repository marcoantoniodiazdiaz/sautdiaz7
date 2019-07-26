import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosModel } from '../../models/productos.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  producto = new ProductosModel();

  constructor(private http: HttpClient, private database: DatabaseService) {}

  get() {
    return this.database.get(`/productos`);
  }

  getById(id: string) {
    return this.database.get(`/productos/${id}`);
  }

  findByName(nombre: string) {
    return this.database.get(`/productos/nombre/${nombre}`);
  }

  post(producto: ProductosModel) {
    return this.database.post(`/productos`, producto);
  }

  put(producto: ProductosModel) {
    return this.database.put(`/productos/${producto['_id']}`, producto);
  }

  delete(id: String) {
    return this.database.delete(`/productos/${id}`);
  }

  restarProducto(cantidad: string, id: string) {
    this.get().subscribe(data => {
      console.log(data);
    });
  }
}
