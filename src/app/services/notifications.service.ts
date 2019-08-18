import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { ClientesService } from './clientes.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(
    private database: DatabaseService,
    private clienteService: ClientesService
  ) {}

  enviarNotificacion(data) {
    const message = data['message'];
    const client = data['client'];

    this.clienteService.getById(client).subscribe((response: any) => {
      if (response['data']['devices'].length > 0) {
        console.log(response['data']['devices']);
        const devices = response['data']['devices'];

        devices.forEach(device => {
          this.database.post(
            `/clientes/notification/${device}/Servicio Automotriz Diaz/${message}`,
            {}
          );
        });
      } else {
        Swal.fire({
          type: 'error',
          text:
            'El cliente no tiene instalada la aplicacion en ningun dispositivo.'
        });
      }
    });
    // return this.database.post(`/clientes/notifications`, producto);
  }
}
