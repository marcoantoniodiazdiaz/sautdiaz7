import { Injectable } from '@angular/core';
import { PagosModel } from '../../models/pagos.model';
import { DatabaseService } from './database.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private url = 'http://localhost:3000';

  pago = new PagosModel();
  constructor(private http: HttpClient, private database: DatabaseService) {}

  get() {
    return this.database.get('/pagos');
  }

  findByServicio(servicio: string) {
    return this.database.get(`/pagos/servicio/${servicio}`);
  }

  post(pago: PagosModel) {
    return this.database.post('/pagos', pago);
  }
}
