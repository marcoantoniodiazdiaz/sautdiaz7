import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../../../services/vehiculos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehiculos-ex',
  templateUrl: './vehiculos-ex.component.html',
  styleUrls: ['./vehiculos-ex.component.css']
})
export class VehiculosExComponent implements OnInit {

  VEHICULO: any[] = [];

  constructor(private vehiculosService: VehiculosService, private router: ActivatedRoute) {
    this.router.params.subscribe(params => {
      const id = params['id'];
      vehiculosService.findById(id).subscribe((data: any) => {
        this.VEHICULO.push(data['data']);
      });
    });
  }

  ngOnInit() {
  }

}
