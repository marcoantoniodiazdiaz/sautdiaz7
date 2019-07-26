import { Component } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { VantaService } from 'src/app/services/vanta.service';
import { ServicioModel } from '../../../models/servicio.model';
import { ServiciosService } from '../../services/servicios.service';
import { VentaModel } from '../../../models/venta.model';
import * as qrcode from 'qrcode-generator';

@Component({
  selector: 'app-htmltopdf',
  templateUrl: './htmltopdf.component.html',
  styleUrls: ['./htmltopdf.component.css']
})
export class HtmltopdfComponent {
  dateNow = new Date().toISOString();

  servicio: string;

  SERVICIO: ServicioModel[] = [];
  VENTA: VentaModel[] = [];
  total: string;

  constructor(
    private router: ActivatedRoute,
    private ventaService: VantaService,
    private servicioService: ServiciosService
  ) {
    router.params.subscribe(data => {
      this.servicio = data['servicio'];
    });

    servicioService.findById(this.servicio).subscribe(data => {
      this.SERVICIO = data['data'];

      this.ventaService.get(this.servicio).subscribe(v => {
        this.total = v['total'];
        this.VENTA = v['data'];
        this.qrCODE(this.servicio);
      });
    });
  }

  qrCODE(id: string) {
    const typeNumber: TypeNumber = 4;
    const errorCorrectionLevel: ErrorCorrectionLevel = 'L';
    const qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(id);
    qr.make();
    document.getElementById('placeHolder').innerHTML = qr.createImgTag(5);
  }
}
