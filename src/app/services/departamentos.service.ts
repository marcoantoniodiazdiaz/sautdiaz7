import { Injectable } from '@angular/core';
import { DepartamentoModel } from '../../models/departamentos.model';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
  public departamento = new DepartamentoModel();

  constructor(private http: HttpClient, private database: DatabaseService) {}

  get() {
    return this.database.get(`/departamentos`);
  }

  post(departamento: DepartamentoModel) {
    return this.database.post('/departamentos', departamento);
  }

  put(departamento: DepartamentoModel) {
    return this.database.put(
      `/departamentos/${departamento['_id']}`,
      departamento
    );
  }

  delete(id: String) {
    return this.database.delete(`/departamentos/${id}`);
  }
}
