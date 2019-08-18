import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PeticionModel } from '../../../../models/peticion.model';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../../../services/database.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { MovimientosModel } from '../../../../models/movimiento.model';
import { MovimientosService } from '../../../services/movimientos.service';

@Component({
  selector: 'app-settings-miss',
  templateUrl: './settings-miss.component.html',
  styles: []
})
export class SettingsMissComponent implements OnInit {
  peticion = new PeticionModel();

  admin = false;

  constructor(
    private http: HttpClient,
    private database: DatabaseService,
    private movimientosService: MovimientosService
  ) {}

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

  superuser() {
    Swal.fire({
      input: 'password',
      type: 'warning',
      title: 'ADMIN',
      text: 'Password:'
    }).then(result => {
      if (result) {
        if (result.value === '240612') {
          this.admin = true;
        }
      }
    });
  }

  movimiento(cuenta: string) {
    const mov = new MovimientosModel();
    Swal.fire({
      input: 'text',
      title: 'ADMIN',
      text: 'Cantidad:'
    }).then(result => {
      if (result) {
        mov.cantidad = result.value;
        mov.cuenta = cuenta;
        mov.descripcion = `CUENTA [${cuenta} -> ${mov.cantidad}]`;
        mov.hidden = true;

        this.movimientosService.post(mov).then(ok => {
          Swal.fire({
            title: 'ADMIN',
            text: 'Correcto',
            type: 'success'
          });
        });
      }
    });
  }
}
