import { Injectable } from '@angular/core';
import { MovimientosModel } from '../../models/movimiento.model';
import { DatabaseService } from './database.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  movimiento = new MovimientosModel();
  constructor(private http: HttpClient, private database: DatabaseService) {}

  get() {
    return this.database.get('/movimientos');
  }

  post(movimiento: MovimientosModel) {
    return this.database.post('/movimientos', movimiento);
  }
}
