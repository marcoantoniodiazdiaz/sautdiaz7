import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  constructor(private http: HttpClient, private database: DatabaseService) {}

  get() {
    return this.database.get(`/marcas`);
  }
}
