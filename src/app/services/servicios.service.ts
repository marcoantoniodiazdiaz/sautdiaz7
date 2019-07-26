import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehiculosModel } from 'src/models/vehiculo.mode';
import { ServicioModel } from '../../models/servicio.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  constructor(private http: HttpClient, private database: DatabaseService) {}

  get() {
    return this.database.get(`/servicios`);
  }

  findById(id: string) {
    return this.database.get(`/servicios/${id}`);
  }

  post(servicio: ServicioModel) {
    return this.database.post(`/servicios`, servicio);
  }

  put(servicio: ServicioModel) {
    return this.database.put(`/servicios/${servicio['_id']}`, servicio);
  }
}
