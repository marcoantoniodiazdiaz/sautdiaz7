import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { ProductosModel } from '../../../../models/productos.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-show',
  templateUrl: './productos-show.component.html',
  styles: []
})
export class ProductosShowComponent implements OnInit {
  PRODUCTOS: ProductosModel[] = [];
  precioCompra = 0;
  precioVenta = 0;

  constructor(
    private productosService: ProductosService,
    private router: Router
  ) {
    this.productosService.get().subscribe(data => {
      this.PRODUCTOS = data['data'];
      this.precioCompra = data['compra'];
      this.precioVenta = data['venta'];
      // console.log(data);
      // this.mainFilter();
    });
  }

  ngOnInit() {}

  edit(producto: ProductosModel) {
    this.productosService.producto = producto;
    this.router.navigateByUrl('/productos/add/edit');
  }

  delete(id: string) {
    Swal.fire({
      title: 'Procesando',
      text: 'Guardando informacion',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.productosService.delete(id).then(ok => {
      Swal.fire({
        title: 'Exito!',
        text: 'Producto borrado',
        type: 'success'
      });
      this.getProductos();
    });
  }

  getProductos() {
    this.productosService.get().subscribe(data => {
      this.PRODUCTOS = data['data'];
    });
  }
}
