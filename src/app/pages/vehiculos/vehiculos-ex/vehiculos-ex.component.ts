import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../../../services/vehiculos.service';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../../../services/servicios.service';
import { ServicioModel } from '../../../../models/servicio.model';

@Component({
  selector: 'app-vehiculos-ex',
  templateUrl: './vehiculos-ex.component.html',
  styleUrls: ['./vehiculos-ex.component.css']
})
export class VehiculosExComponent implements OnInit {

  VEHICULO: any[] = [];
  SERVICIOS: ServicioModel[] = [];

  constructor(private vehiculosService: VehiculosService, private router: ActivatedRoute, private serviciosService: ServiciosService) {
    this.router.params.subscribe(params => {
      const id = params['id'];
      vehiculosService.findById(id).subscribe((data: any) => {
        this.VEHICULO.push(data['data']);
        this.getServicios(id);
      });
    });
  }

  ngOnInit() {
  }

  getServicios(id: string) {
    this.serviciosService.findByVehiculo(id).subscribe((data: any) => {
      this.SERVICIOS = data['data'];
      console.log(this.SERVICIOS)
    });
  }

}
