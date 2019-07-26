import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ContabilidadService {
  constructor(private database: DatabaseService) {}

  getByFecha(start: string, end: string) {
    return this.database.get(`/contabilidad/${start}/${end}`);
  }
}
