import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MovimientosModel } from '../../../../models/movimiento.model';
import { MovimientosService } from '../../../services/movimientos.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styles: []
})
export class ManualComponent implements OnInit {
  activated = false;

  constructor(private movimientosService: MovimientosService) {}

  ngOnInit() {}

  unlock() {
    if (this.activated) {
      this.activated = false;
      return;
    }

    const password = 'danieldiaz22';
    Swal.fire({
      type: 'warning',
      title: 'Acceso',
      text: 'Ingrese la contraseña',
      input: 'password'
    }).then(result => {
      if (result.value) {
        if (result.value === password) {
          this.activated = true;
        } else {
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'La contraseña no es valida'
          });
        }
      }
    });
  }

  movimiento(cuenta: number) {
    if (!this.activated && (cuenta !== 0 && cuenta !== 1)) {
      return;
    }

    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Siguiente &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    })
      .queue([
        {
          title: 'Descripción'
        },
        {
          title: 'Monto'
        }
      ])
      .then(result => {
        if (result.value) {
          if (result.value[0] === '' || result.value[1] === '') {
            Swal.fire({
              type: 'warning',
              title: '¡Advertencia!',
              text: 'Ambos campos son obligatorios'
            });
            return;
          }

          const mov = new MovimientosModel();
          mov.cantidad = result.value[1];
          mov.cuenta = cuenta.toString();
          mov.descripcion = '[M] ' + result.value[0];
          mov.descripcion = mov.descripcion.toUpperCase();

          this.movimientosService.post(mov).then(ok => {
            Swal.fire({
              type: 'success',
              title: 'Correcto',
              text: 'Movimiento registrado'
            });
          });
        }
      });
  }
}
