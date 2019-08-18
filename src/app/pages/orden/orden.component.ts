import { Component, OnInit } from '@angular/core';
import { ServicioModel } from 'src/models/servicio.model';
import { ClienteModel } from 'src/models/clientes.model';
import { VehiculosModel } from 'src/models/vehiculo.mode';
import { MarcasModel } from 'src/models/marcas.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { MarcasService } from 'src/app/services/marcas.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { TrabajadoresModel } from '../../../models/trabajadores.model';
import { TrabajadoresService } from '../../services/trabajadores.service';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {
  servicio = new ServicioModel();

  VEHICULOS: VehiculosModel[] = [];

  CLIENTES: ClienteModel[] = [];
  cliente = new ClienteModel();

  vehiculo = new VehiculosModel();

  MARCAS: MarcasModel[] = [];
  TRABAJADORES: TrabajadoresModel[] = [];

  VerAgregarCliente = false;
  VerAgregarVehiculo = false;

  constructor(
    private clienteService: ClientesService,
    private trabajadoresService: TrabajadoresService,
    private vehiculosService: VehiculosService,
    private marcasService: MarcasService,
    private servicioService: ServiciosService
  ) {
    this.getClientes();
    this.getMarcas();
    this.getTrabajadores();
  }

  ngOnInit() {}

  getClientes() {
    this.clienteService.get().subscribe(data => {
      this.CLIENTES = data['data'];
    });
  }

  getTrabajadores() {
    this.trabajadoresService.get().subscribe(data => {
      this.TRABAJADORES = data['data'];
    });
  }

  getMarcas() {
    this.marcasService.get().subscribe(data => {
      this.MARCAS = data['data'];
    });
  }

  guardarCliente(form: NgForm) {
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

    this.clienteService.post(this.cliente).then(ok => {
      Swal.fire({
        title: this.cliente.nombre,
        text: 'Informacion agregada correctamente',
        type: 'success'
      });

      this.getClientes();
    });
  }

  guardarVehiculo(form: NgForm) {
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

    this.vehiculosService.post(this.vehiculo).then(ok => {
      Swal.fire({
        title: this.vehiculo.placa,
        text: 'Informacion agregada correctamente',
        type: 'success'
      });
    });
  }

  seleccionaCliente(id: string) {
    this.vehiculosService.findByCliente(id).subscribe(data => {
      this.VEHICULOS = data['data'];
    });
  }

  seleccionaVehiculo(id: string) {
    this.servicio.vehiculo = id;

    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Se creara el servicio para el coche seleccionado',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'De acuerdo',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        Swal.fire({
          title: 'Procesando',
          text: 'Guardando informacion',
          type: 'info',
          allowOutsideClick: true
        });
        Swal.showLoading();

        console.log(this.servicio.trabajador);

        if (!this.servicio.trabajador) {
          console.log('Entre!');
          Swal.fire({
            title: 'Error',
            text: 'Algunos campos son obligatorios',
            type: 'warning',
            allowOutsideClick: false
          });
          return;
        }

        this.servicioService.post(this.servicio).then(ok => {
          Swal.fire({
            title: this.vehiculo.placa,
            text: 'Informacion agregada correctamente',
            type: 'success'
          });
        });
      }
    });
  }

  findCliente(nombre: string) {
    nombre = nombre.toUpperCase();
    if (nombre === '') {
      this.getClientes();
    } else {
      this.clienteService.findByNombre(nombre).subscribe(data => {
        this.CLIENTES = data['data'];
      });
    }
  }
}
