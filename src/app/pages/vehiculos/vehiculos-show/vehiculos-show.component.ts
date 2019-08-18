import { Component, OnInit } from '@angular/core';
import { VehiculosModel } from 'src/models/vehiculo.mode';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { MarcasService } from 'src/app/services/marcas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos-show',
  templateUrl: './vehiculos-show.component.html',
  styles: []
})
export class VehiculosShowComponent implements OnInit {
  VEHICULOS: VehiculosModel[] = [];
  loading = true;

  constructor(
    private vehiculosService: VehiculosService,
    private marcasService: MarcasService,
    private router: Router
  ) {
    this.getVehiculos();
  }

  ngOnInit() {}

  edit(vehiculo: VehiculosModel) {
    this.vehiculosService.vehiculo = vehiculo;
    this.router.navigateByUrl('vehiculos/add/edit');
  }

  delete(id: string) {
    Swal.fire({
      title: 'Procesando',
      text: 'Guardando informacion',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.vehiculosService.delete(id).then(ok => {
      Swal.fire({
        title: 'Exito!',
        text: 'Vehiculo borrado',
        type: 'success'
      });
      this.getVehiculos();
    });
  }

  getVehiculos() {
    this.vehiculosService.get().subscribe(data => {
      this.VEHICULOS = data['data'];
      this.loading = false;
    });
  }
}
