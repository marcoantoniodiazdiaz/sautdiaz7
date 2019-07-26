import { Injectable } from '@angular/core';
import { MostradorModel } from '../../models/mostrador.model';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class MostradorService {
  mostrador = new MostradorModel();
  constructor(private http: HttpClient, private database: DatabaseService) {}

  get() {
    return this.database.get('/mostrador');
  }

  post() {
    return this.database.post('/mostrador', {});
  }
}
