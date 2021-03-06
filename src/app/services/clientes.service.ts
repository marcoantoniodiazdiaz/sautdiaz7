import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClienteModel } from '../../models/clientes.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  cliente = new ClienteModel();

  constructor(private http: HttpClient, private database: DatabaseService) {}

  get() {
    return this.database.get('/clientes');
  }

  getById(id: string) {
    return this.database.get(`/clientes/${id}`);
  }

  findByNombre(nombre: string) {
    return this.database.get(`/clientes/nombre/${nombre}`);
  }

  post(cliente: ClienteModel) {
    return this.database.post('/clientes', cliente);
  }

  put(cliente: ClienteModel) {
    return this.database.put(`/clientes/${cliente['_id']}`, cliente);
  }

  delete(id: String) {
    return this.database.delete(`/clientes/${id}`);
  }
}
