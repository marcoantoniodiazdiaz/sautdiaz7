import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../../../../models/clientes.model';
import { ClientesService } from '../../../services/clientes.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'app-clientes-show',
  templateUrl: './clientes-show.component.html',
  styles: []
})
export class ClientesShowComponent implements OnInit {
  CLIENTES: ClienteModel[] = [];

  loading = true;

  constructor(
    private clientesService: ClientesService,
    private router: Router,
    private notificationService: NotificationsService
  ) {}

  ngOnInit() {
    this.getClientes();
  }

  edit(cliente: ClienteModel) {
    this.clientesService.cliente = cliente;
    this.router.navigateByUrl('/clientes/add/edit');
  }

  delete(id: string) {
    Swal.fire({
      title: 'Procesando',
      text: 'Guardando informacion',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.clientesService.delete(id).then(ok => {
      Swal.fire({
        title: 'Exito!',
        text: 'Cliente borrado',
        type: 'success'
      });
      this.getClientes();
    });
  }

  getClientes() {
    this.clientesService.get().subscribe((data: any) => {
      this.CLIENTES = data['data'];

      this.loading = false;
    });
  }

  sendNotification(client: string) {
    Swal.fire({
      text: 'Enviar notificacion a cliente',
      input: 'text',
      type: 'info'
    }).then(result => {
      if (result.value) {
        this.notificationService.enviarNotificacion({
          message: result.value,
          client: client
        });
      }
    });
  }
}
