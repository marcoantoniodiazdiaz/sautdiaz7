import { Component, OnInit, Input } from '@angular/core';
import { ServicioModel } from '../../../../models/servicio.model';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ventas-print',
  templateUrl: './ventas-print.component.html',
  styleUrls: []
})
export class VentasPrintComponent {
  @Input() SERVICIO: ServicioModel[] = [];

  dateNow = new Date().toISOString();

  public captureScreen() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      console.log(canvas);

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }
}
