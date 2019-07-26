import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';
import { VentaMostradorModel } from '../../models/venta-mostrador.model';

@Injectable({
  providedIn: 'root'
})
export class VentaMostradorService {
  constructor(private http: HttpClient, private database: DatabaseService) {}

  get() {
    return this.database.get(`/ventas-mostrador`);
  }

  getById(id: string) {
    return this.database.get(`/ventas-mostrador/venta/${id}`);
  }

  post(ventaMostrador: VentaMostradorModel) {
    return this.database.post('/ventas-mostrador', ventaMostrador);
  }

  put(ventaMostrador: VentaMostradorModel) {
    return this.database.put(
      `/ventas-mostrador/${ventaMostrador['_id']}`,
      ventaMostrador
    );
  }

  delete(id: String) {
    return this.database.delete(`/ventas-mostrador/${id}`);
  }
}
