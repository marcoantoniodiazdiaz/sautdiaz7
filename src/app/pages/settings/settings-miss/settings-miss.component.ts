import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PeticionModel } from '../../../../models/peticion.model';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-settings-miss',
  templateUrl: './settings-miss.component.html',
  styles: []
})
export class SettingsMissComponent implements OnInit {
  peticion = new PeticionModel();

  constructor(private http: HttpClient, private database: DatabaseService) {}

  ngOnInit() {}

  peticionexec(form: NgForm) {
    if (this.peticion.llave === '240612') {
      this.database.get(this.peticion.url).subscribe((data: any) => {
        this.peticion.resultado = data;
      });
    } else {
      this.peticion.resultado = 'Llave incorrecta';
    }
  }
}
