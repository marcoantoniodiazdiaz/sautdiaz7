import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductosModel } from '../../../../models/productos.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductosService } from '../../../services/productos.service';
import { VantaService } from 'src/app/services/vanta.service';
import { VentaModel } from '../../../../models/venta.model';

@Component({
  selector: 'app-ventas-nolistado',
  templateUrl: './ventas-nolistado.component.html',
  styles: []
})
export class VentasNolistadoComponent implements OnInit {
  producto = new ProductosModel();
  venta = new VentaModel();
  ManoObra = false;

  codigoManoDeObra = '5d15130f3db192098e178ed0';
  codigoNoListado = '5d1513163db192098e178ed1';

  @Output() ActualizaProductos = new EventEmitter();
  @Input() servicio: string;

  constructor(
    private productosService: ProductosService,
    private ventaService: VantaService
  ) {
    this.producto.codigo = '0';
    this.producto.departamento = '';
  }

  ngOnInit() {}

  guardar(form: NgForm) {
    this.producto.nombre = this.producto.nombre.toUpperCase();

    if (this.ManoObra) {
      this.producto.departamento = this.codigoManoDeObra;
    } else {
      this.producto.departamento = this.codigoNoListado;
    }

    Swal.fire({
      input: 'text',
      confirmButtonText: 'Ok',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      title: this.producto.nombre,
      text: 'Cantidad:'
    }).then(result => {
      if (result.value) {
        this.producto.existencia = result.value;

        this.productosService.post(this.producto).then(data => {
          const productoAdd = data['productos'];
          this.venta.cantidad = result.value;
          this.venta.producto = productoAdd['_id'];
          this.venta.servicio = this.servicio;

          this.ventaService.post(this.venta).then(ok => {
            this.ActualizaProductos.emit();
          });
        });
      }
    });
  }
}
