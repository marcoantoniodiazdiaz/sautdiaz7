import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosModel } from '../../../models/productos.model';
import { VantaService } from 'src/app/services/vanta.service';
import { ServiciosService } from '../../services/servicios.service';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  public servicio: string;

  public SERVICIO = [];

  public PRODUCTOS: any[] = [];
  public TOTAL: string;
  public MO: string;
  public TOTALCOMPRA: string;

  public editable = true;

  constructor(
    private router: ActivatedRoute,
    private ventaService: VantaService,
    private servicioService: ServiciosService
  ) {
    this.router.params.subscribe(data => {
      this.servicio = data['servicio'];
      this.getProductos();
      this.getServicioInfo();
    });
  }

  getServicioInfo() {
    this.servicioService.findById(this.servicio).subscribe(data => {
      this.SERVICIO = data['data'];
      if (this.SERVICIO[0]['estado'] !== '0') {
        this.editable = false;
      }
    });
  }

  getProductos() {
    this.ventaService.get(this.servicio).subscribe((data: any[]) => {
      this.PRODUCTOS = data['data'];
      this.TOTAL = data['total'];
      this.MO = data['mo'];
      this.TOTALCOMPRA = data['totalCompra'];
    });
  }

  ngOnInit() {}

  ActualizaProductos() {
    this.getProductos();
  }
}
