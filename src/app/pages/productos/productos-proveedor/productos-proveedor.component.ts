import { Component, OnInit } from '@angular/core';
import { ProductosModel } from '../../../../models/productos.model';
import { ProductosService } from '../../../services/productos.service';
import Swal from 'sweetalert2';
import { MovimientosService } from '../../../services/movimientos.service';
import { MovimientosModel } from '../../../../models/movimiento.model';

@Component({
  selector: 'app-productos-proveedor',
  templateUrl: './productos-proveedor.component.html',
  styles: []
})
export class ProductosProveedorComponent implements OnInit {
  PRODUCTOS: ProductosModel[] = [];

  AGREGAR = [];

  constructor(
    private productosService: ProductosService,
    private movimientosService: MovimientosService
  ) {}

  ngOnInit() {}

  findByName(nombre: string) {
    nombre = nombre.toUpperCase();

    if (nombre.length > 0) {
      this.productosService.findByName(nombre).subscribe(data => {
        this.PRODUCTOS = data['data'];
      });
    } else {
      this.PRODUCTOS = [];
    }
  }

  agregarProducto(id: string, nombre: string, compra: string) {
    let cantidad: number;
    Swal.fire({
      input: 'text',
      confirmButtonText: 'Ok',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      title: nombre,
      text: 'Cantidad:'
    }).then(result => {
      if (result.value) {
        cantidad = result.value;

        this.AGREGAR.push({ id, nombre, cantidad, compra });
      }
    });
  }

  realizarInsercion() {
    let cantidad = 0;
    let precioDeMercancia = 0;
    this.AGREGAR.forEach(producto => {
      cantidad += +producto['cantidad'];
      precioDeMercancia += +producto['compra'] * +producto['cantidad'];
    });

    const movimiento = new MovimientosModel();
    movimiento.cantidad = precioDeMercancia.toString();
    movimiento.cuenta = '2';
    movimiento.descripcion = 'PAGO PENDIENTE DE MERCANCIAS';
    this.movimientosService.post(movimiento);
    movimiento.cuenta = '4';
    movimiento.descripcion = 'LLEGADA DE MERCANCIA';
    this.movimientosService.post(movimiento);

    Swal.fire({
      title: '¿Estas seguro?',
      text: `Se insertaran ${cantidad} de unidades al inventario. Recuerda tener los precios de compra actualizados.`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then(result => {
      if (result.value) {
        this.AGREGAR.forEach(producto => {
          this.agregarProductoAInventario(producto['cantidad'], producto['id']);
        });
        Swal.fire(
          'Correcto',
          'Se han insertado los elementos correctamente',
          'success'
        ).then(ok => {
          this.AGREGAR = [];
        });
      }
    });
  }

  agregarProductoAInventario(cantidad: number, id: string) {
    const producto = new ProductosModel();

    this.productosService.getById(id).subscribe(data => {
      let existencia = data['data']['existencia'];
      existencia += +cantidad;

      producto['_id'] = id;
      producto.existencia = existencia;

      this.productosService.put(producto);
    });
  }
}
