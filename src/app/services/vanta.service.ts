import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentaModel } from '../../models/venta.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class VantaService {
  constructor(private http: HttpClient, private database: DatabaseService) {}

  get(servicio: string) {
    return this.database.get(`/ventas/servicio/${servicio}`);
  }

  post(venta: VentaModel) {
    return this.database.post(`/ventas`, venta);
  }

  delete(id: String) {
    return this.database.delete(`/ventas/${id}`);
  }
}
