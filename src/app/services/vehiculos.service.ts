import { Injectable } from '@angular/core';
import { VehiculosModel } from '../../models/vehiculo.mode';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  public vehiculo = new VehiculosModel();

  constructor(private http: HttpClient, private database: DatabaseService) {}

  get() {
    return this.database.get(`/vehiculos`);
  }

  findByCliente(id: string) {
    return this.database.get(`/vehiculos/cliente/${id}`);
  }

  post(vehiculo: VehiculosModel) {
    return this.database.post(`/vehiculos`, vehiculo);
  }

  put(vehiculo: VehiculosModel) {
    return this.database.put(`/vehiculos/${vehiculo['_id']}`, vehiculo);
  }

  delete(id: String) {
    return this.database.delete(`/vehiculos/${id}`);
  }
}
