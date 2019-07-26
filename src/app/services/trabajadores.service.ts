import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient, private database: DatabaseService) {}

  get() {
    return this.database.get(`/trabajadores`);
  }
}
