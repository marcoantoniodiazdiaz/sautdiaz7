import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClienteModel } from '../../models/clientes.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private url = 'http://localhost:3000';

  cliente = new ClienteModel();

  constructor(private http: HttpClient, private database: DatabaseService) {}

  get() {
    return this.database.get('/clientes');
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
