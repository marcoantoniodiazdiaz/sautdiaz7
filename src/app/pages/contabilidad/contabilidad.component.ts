import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContabilidadService } from '../../services/contabilidad.service';
import { MovimientosModel } from '../../../models/movimiento.model';
import { ServicioModel } from '../../../models/servicio.model';

declare var $: any;

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.css']
})
export class ContabilidadComponent implements OnInit {
  constructor(private contabilidadService: ContabilidadService) {
    const today = new Date();
    today.setHours(0, 0, 0);
    this.start = today.toISOString();
    today.setDate(today.getDate() + 1);
    this.end = today.toISOString();

    console.log(this.start);
    this.ejecutarConsulta(this.start, this.end);
  }

  start: any;
  end: any;

  ALLINFO = [];

  estaFecha = [];
  total = [];
  movimientos: MovimientosModel[] = [];
  servicios: ServicioModel[] = [];

  utilidadRango = 0;
  utilidadTotal = 0;

  ngOnInit() {}

  guardar(form: NgForm) {
    this.start = $('#start').val();
    this.end = $('#end').val();

    this.ejecutarConsulta(this.start, this.end);
  }

  ejecutarConsulta(init: string, end: string) {
    if (this.start === '' || this.end === '') {
      return;
    }

    const dateInit = new Date(this.start);
    const dateEnd = new Date(this.end);

    this.contabilidadService
      .getByFecha(dateInit.toISOString(), dateEnd.toISOString())
      .subscribe((data: any) => {
        this.ALLINFO = data;
        this.estaFecha = this.ALLINFO['estaFecha'];
        this.total = this.ALLINFO['total'];
        this.movimientos = this.ALLINFO['movimientos'];
        this.servicios = this.ALLINFO['servicios'];

        // console.log(this.estaFecha);
        this.utilidadRango =
          +this.estaFecha['caja'] +
          +this.estaFecha['bancos'] +
          +this.estaFecha['mercancias'] +
          +this.estaFecha['clientes'] -
          +this.estaFecha['proveedores'];

        this.estandarizarCuentas();
      });
  }

  estandarizarCuentas() {
    this.movimientos.forEach(movimiento => {
      switch (movimiento.cuenta) {
        case '0':
          movimiento.cuenta = 'CAJAS';
          break;
        case '1':
          movimiento.cuenta = 'BANCOS';
          break;
        case '2':
          movimiento.cuenta = 'PROVEEDORES';
          break;
        case '3':
          movimiento.cuenta = 'CLIENTES';
          break;
        case '4':
          movimiento.cuenta = 'MERCANCIAS';
          break;
      }
    });
  }
}
