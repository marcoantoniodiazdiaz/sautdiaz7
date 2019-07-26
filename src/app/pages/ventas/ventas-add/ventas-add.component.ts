import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductosModel } from '../../../../models/productos.model';
import { ProductosService } from '../../../services/productos.service';
import { VentaModel } from 'src/models/venta.model';
import Swal from 'sweetalert2';
import { VantaService } from 'src/app/services/vanta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventas-add',
  templateUrl: './ventas-add.component.html',
  styles: []
})
export class VentasAddComponent implements OnInit {
  @Input() servicio: string;

  @Output() ActualizaProductos = new EventEmitter();

  PRODUCTOS: ProductosModel[] = [];

  venta = new VentaModel();

  constructor(
    private productosService: ProductosService,
    private ventaService: VantaService,
    private router: Router
  ) {
    this.getProductos();
  }

  ngOnInit() {}

  findByName(nombre: string) {
    nombre = nombre.toUpperCase();

    if (nombre.length <= 0) {
      this.getProductos();
    } else {
      this.productosService.findByName(nombre).subscribe(data => {
        this.PRODUCTOS = data['data'];
        // this.mainFilter();
      });
    }
  }

  getProductos() {
    this.productosService.get().subscribe(data => {
      this.PRODUCTOS = data['data'];
    });
  }

  addProducto(producto: ProductosModel) {
    this.venta.servicio = this.servicio;
    this.venta.producto = producto['_id'];

    Swal.fire({
      input: 'text',
      confirmButtonText: 'Ok',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      title: producto.nombre,
      text: 'Cantidad:'
    }).then(result => {
      if (result.value) {
        this.venta.cantidad = result.value;

        this.ventaService.post(this.venta).then(ok => {
          this.ActualizaProductos.emit();
        });
      }
    });
  }
}
