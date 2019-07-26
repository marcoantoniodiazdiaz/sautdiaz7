import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../../../../models/clientes.model';
import { ClientesService } from '../../../services/clientes.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-add',
  templateUrl: './clientes-add.component.html',
  styles: []
})
export class ClientesAddComponent implements OnInit {
  cliente = this.clienteService.cliente;
  mode: string;

  constructor(private clienteService: ClientesService, router: ActivatedRoute) {
    router.params.subscribe(data => {
      this.mode = data['type'];
      if (data['type'] === 'new') {
        this.cliente = new ClienteModel();
      } else {
        this.cliente = this.clienteService.cliente;
      }
    });
  }

  ngOnInit() {}

  guardar(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Algunos campos son obligatorios',
        type: 'warning',
        allowOutsideClick: false
      });
      return;
    }

    Swal.fire({
      title: 'Procesando',
      text: 'Guardando informacion',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.cliente.nombre = this.cliente.nombre.toUpperCase();
    this.cliente.calle = this.cliente.calle.toUpperCase();
    this.cliente.colonia = this.cliente.colonia.toUpperCase();

    if (this.mode === 'edit') {
      this.clienteService.put(this.cliente).then(ok => {
        Swal.fire({
          title: this.cliente.nombre,
          text: 'Informacion actualizada correctamente',
          type: 'success'
        });
      });
    } else {
      this.clienteService.post(this.cliente).then(ok => {
        Swal.fire({
          title: this.cliente.nombre,
          text: 'Informacion agregada correctamente',
          type: 'success'
        });
      });
    }
  }
}
