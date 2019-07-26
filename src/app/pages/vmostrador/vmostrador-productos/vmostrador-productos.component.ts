import { Component, OnInit } from '@angular/core';
import { ProductosModel } from '../../../../models/productos.model';
import { ProductosService } from '../../../services/productos.service';
import { VentaMostradorService } from '../../../services/venta-mostrador.service';
import { VentaMostradorModel } from '../../../../models/venta-mostrador.model';
import { ActivatedRoute } from '@angular/router';
import { MostradorService } from '../../../services/mostrador.service';
import Swal from 'sweetalert2';
import { MovimientosModel } from '../../../../models/movimiento.model';
import { MovimientosService } from '../../../services/movimientos.service';

declare var $: any;

@Component({
  selector: 'app-vmostrador-productos',
  templateUrl: './vmostrador-productos.component.html',
  styles: []
})
export class VmostradorProductosComponent implements OnInit {
  TODOSPRODUCTOS: ProductosModel[] = [];
  PRODUCTOS: any[] = [];
  TOTAL = 0;
  MERCANCIAS = 0;

  venta: string;

  constructor(
    private productosService: ProductosService,
    private ventaMostradorService: VentaMostradorService,
    private router: ActivatedRoute,
    private mostradorService: MostradorService,
    private movimientosService: MovimientosService
  ) {
    this.productosService.get().subscribe(data => {
      this.TODOSPRODUCTOS = data['data'];
    });

    this.router.params.subscribe(params => {
      this.venta = params['venta'];
      this.cargarProductos();
    });
  }

  ngOnInit() {}

  cargarProductos() {
    this.ventaMostradorService.getById(this.venta).subscribe(data => {
      this.PRODUCTOS = data['data'];
      this.TOTAL = data['total'];
      this.MERCANCIAS = data['totalCompra'];
      // console.log(data);
    });
  }

  // 7501008724530
  // 7501008724560

  agregarProducto(code: string) {
    if (/^[0-9]{13}$/.test(code)) {
      this.findByCode(code);
    }
  }

  findByCode(code: string) {
    const audio = new Audio('assets/sounds/boop.mp3');

    let finded = new ProductosModel();
    finded = this.TODOSPRODUCTOS.find(element => {
      return element.codigo === code;
    });

    if (!finded) {
      $('#cajaID').val('');
      Swal.fire('Comprueba el codigo', 'Producto no encontrado', 'question');
    }

    if (finded) {
      audio.play();
      const venta = new VentaMostradorModel();
      venta.cantidad = 1;
      venta.producto = finded['_id'];
      venta.venta = this.venta;
      this.ventaMostradorService.post(venta).then(ok => {
        this.cargarProductos();
        $('#cajaID').val('');
      });
    }
  }

  delete(id: string) {
    this.ventaMostradorService.delete(id).then(ok => {
      this.cargarProductos();
    });
  }

  cobrar() {
    let pago = 0;
    Swal.fire({
      input: 'text',
      title: 'Contabilidad',
      text: 'Pago con: ',
      type: 'question',
      showCancelButton: true
    }).then(result => {
      if (result.value) {
        pago = result.value;
        Swal.fire({
          title: 'Contabilidad',
          text: `El cambio es: ${pago - this.TOTAL}`,
          type: 'info',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Entregué el cambio'
        }).then(r2 => {
          if (r2.value) {
            this.PRODUCTOS.forEach(indice => {
              this.restarProductos(
                indice['cantidad'],
                indice['producto']['_id']
              );
            });

            const movimiento = new MovimientosModel();
            movimiento.cantidad = this.TOTAL.toString();
            movimiento.cuenta = '0';
            movimiento.descripcion = 'VENTA DE MOSTRADOR';

            this.movimientosService.post(movimiento);
            movimiento.cantidad = (-1 * this.MERCANCIAS).toString();
            movimiento.cuenta = '4';
            movimiento.descripcion =
              'MERCANCIA UTILIZADA EN UNA VENTA DE MOSTRADOR';
            this.movimientosService.post(movimiento);
            Swal.fire(
              'Contabilidad',
              'Venta de mostrador registrada',
              'success'
            );
          }
        });
      }
    });
  }

  restarProductos(cantidad: number, id: string) {
    const producto = new ProductosModel();

    this.productosService.getById(id).subscribe(data => {
      let existencia = data['data']['existencia'];
      existencia -= cantidad;

      producto['_id'] = data['data']['_id'];
      producto.existencia = existencia;

      this.productosService.put(producto);
    });
  }
}
