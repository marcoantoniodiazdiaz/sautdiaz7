import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-servicios-show',
  templateUrl: './servicios-show.component.html',
  styles: []
})
export class ServiciosShowComponent implements OnInit {
  SERVICIOS: any[] = [];

  constructor(private serviciosService: ServiciosService) {
    this.serviciosService.get().subscribe(data => {
      this.SERVICIOS = data['data'];
      this.comprobarIntegridad();
    });
  }

  comprobarIntegridad() {}

  ngOnInit() {}
}
