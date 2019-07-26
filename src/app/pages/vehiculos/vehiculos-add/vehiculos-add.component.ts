import { Component, OnInit } from '@angular/core';
import { MarcasModel } from '../../../../models/marcas.model';
import { ClienteModel } from '../../../../models/clientes.model';
import { VehiculosModel } from '../../../../models/vehiculo.mode';
import { MarcasService } from '../../../services/marcas.service';
import { VehiculosService } from '../../../services/vehiculos.service';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../../services/clientes.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos-add',
  templateUrl: './vehiculos-add.component.html',
  styles: []
})
export class VehiculosAddComponent implements OnInit {

  mode: string;

  MARCAS: MarcasModel[] = [];
  CLIENTES: ClienteModel[] = [];
  vehiculo: VehiculosModel;

  constructor(private marcasService: MarcasService, private vehiculoService: VehiculosService, private router: ActivatedRoute,
              private clientesService: ClientesService) {
    marcasService.get().subscribe(data => {
      this.MARCAS = data['data'];
    });

    clientesService.get().subscribe(data => {
      this.CLIENTES = data['data'];
    });


    router.params.subscribe(data => {
      this.mode = data['type'];
      if (data['type'] === 'new') {
        this.vehiculo = new VehiculosModel();
      } else {
        this.vehiculo = this.vehiculoService.vehiculo;
        this.vehiculo.cliente = this.vehiculo.cliente['_id'];
        this.vehiculo.marca = this.vehiculo.marca['_id'];
      }
    });
  }

  guardar(form: NgForm) {
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

    this.vehiculo.submarca = this.vehiculo.submarca.toUpperCase();
    this.vehiculo.placa = this.vehiculo.placa.toUpperCase();

    if (this.mode === 'edit') {
      this.vehiculoService.put(this.vehiculo).then(ok => {
        Swal.fire({
          title: this.vehiculo.placa,
          text: 'Informacion actualizada correctamente',
          type: 'success'
        });
      });
    } else {
      this.vehiculoService.post(this.vehiculo).then(ok => {
        Swal.fire({
          title: this.vehiculo.placa,
          text: 'Informacion agregada correctamente',
          type: 'success'
        });
      });
    }
  }

  ngOnInit() {
  }
}
