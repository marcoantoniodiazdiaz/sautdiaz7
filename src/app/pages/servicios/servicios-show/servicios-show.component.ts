import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-servicios-show',
  templateUrl: './servicios-show.component.html',
  styles: []
})
export class ServiciosShowComponent implements OnInit {
  SERVICIOS: any[] = [];

  loading = true;

  constructor(private serviciosService: ServiciosService) {
    this.getServicios();
  }

  ngOnInit() {}

  getServicios() {
    this.serviciosService.get().subscribe(data => {
      this.SERVICIOS = data['data'];
      this.loading = false;
    });
  }

  find(term: string) {
    if (term === null || term === '') {
      this.getServicios();

      return;
    }

    this.serviciosService.findByTerm(term).subscribe((data: any) => {
      this.SERVICIOS = data['data'];
    });
  }
}
