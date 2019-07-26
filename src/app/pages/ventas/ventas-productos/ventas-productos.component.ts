import { Component, Input, EventEmitter, Output } from '@angular/core';
import { VantaService } from '../../../services/vanta.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';
import { ProductosModel } from '../../../../models/productos.model';
import { MovimientosModel } from '../../../../models/movimiento.model';
import { MovimientosService } from '../../../services/movimientos.service';
import { PagosModel } from '../../../../models/pagos.model';
import { ServiciosService } from '../../../services/servicios.service';
import { PagosService } from '../../../services/pagos.service';
import { ServicioModel } from '../../../../models/servicio.model';

@Component({
  selector: 'app-ventas-productos',
  templateUrl: './ventas-productos.component.html',
  styleUrls: []
})
export class VentasProductosComponent {
  @Input() PRODUCTOS: any[];
  @Input() TOTAL: number;
  @Input() MO: string;
  @Input() servicio: string;
  @Input() TOTALCOMPRA: string;
  @Input() editable: boolean;

  @Output() ActualizaProductos = new EventEmitter();

  PAGOS: PagosModel[] = [];
  PAGADO = 0;

  mostrarPago = false;

  constructor(
    private ventaService: VantaService,
    private router: Router,
    private productosService: ProductosService,
    private movimientosService: MovimientosService,
    private servicioService: ServiciosService,
    private pagosService: PagosService,
    private aRoute: ActivatedRoute
  ) {
    this.aRoute.params.subscribe(params => {
      this.actualizarPagos(params['servicio']);
    });
  }

  actualizarPagos(servicio: string) {
    this.PAGADO = 0;
    this.pagosService.findByServicio(servicio).subscribe(data => {
      this.PAGOS = data['data'];
      this.PAGOS.forEach(pago => {
        this.PAGADO += +pago['movimiento']['cantidad'];
      });
      // console.log(this.PAGADO);
      this.comprobarEstadoDePago();
    });
  }

  delete(id: string) {
    this.ventaService.delete(id).then(ok => {
      this.ActualizaProductos.emit();
    });
  }

  terminarServicio() {
    Swal.fire({
      title: '¡Cuidado!',
      text: 'Ya no podras modificar esta venta',
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then(result => {
      if (result.value) {
        this.PRODUCTOS.forEach(indice => {
          this.restarProductos(indice['cantidad'], indice['producto']['_id']);
        });
        const servicioMod = new ServicioModel();
        servicioMod.estado = '1';
        servicioMod['_id'] = this.servicio;
        this.servicioService.put(servicioMod).then(ok => {
          Swal.fire('Hecho', 'El servicio ha sido finalizado', 'success');
        });
        const movimiento = new MovimientosModel();
        movimiento.cantidad = this.TOTAL.toString();
        movimiento.cuenta = '3';
        this.servicioService.findById(this.servicio).subscribe(data => {
          const vehiculo = data['data'][0]['vehiculo'];
          movimiento.descripcion = `SERVICIO TERMINADO DEL VEHICULO ${
            vehiculo['marca']['nombre']
          } ${vehiculo['submarca']} CON PLACAS ${vehiculo['placa']}`;
          this.movimientosService.post(movimiento);

          movimiento.cuenta = '4';
          movimiento.cantidad = (+this.TOTALCOMPRA * -1).toString();
          movimiento.descripcion = `MERCANCIA UTILIAZADA EN EL SERVICIO DEL VEHICULO ${
            vehiculo['marca']['nombre']
          } ${vehiculo['submarca']} CON PLACAS ${vehiculo['placa']}`;
          this.movimientosService.post(movimiento);
          this.router.navigateByUrl('/servicios');
        });
      }
    });
  }

  print(): void {
    this.router.navigateByUrl(`/con/${this.servicio}`);
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

  registrarPagoEfectivo() {
    Swal.fire({
      input: 'text',
      confirmButtonText: 'Ok',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      title: 'Pago en efectivo',
      text: 'Cantidad:'
    }).then(result => {
      if (result.value) {
        const movimiento = new MovimientosModel();
        const pago = new PagosModel();

        pago.servicio = this.servicio;

        movimiento.cantidad = result.value;
        movimiento.cuenta = '0';

        this.servicioService.findById(this.servicio).subscribe(data => {
          const vehiculo = data['data'][0]['vehiculo'];
          movimiento.descripcion = `PAGO DEL VEHICULO ${
            vehiculo['marca']['nombre']
          } ${vehiculo['submarca']} CON PLACAS ${vehiculo['placa']}`;

          this.movimientosService.post(movimiento).then(mov => {
            pago.movimiento = mov['data']['_id'];
            this.pagosService.post(pago).then(ok => {
              Swal.fire('Hecho', 'Pago registrado con exito', 'success');
              this.actualizarPagos(this.servicio);
            });
            movimiento.cantidad = (+movimiento.cantidad * -1).toString();
            movimiento.cuenta = '3';
            this.movimientosService.post(movimiento);
          });
        });
      }
    });
  }

  registrarPagoConCheque() {
    Swal.fire({
      input: 'text',
      confirmButtonText: 'Ok',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      title: 'Pago con cheque',
      text: 'Cantidad:'
    }).then(result => {
      if (result.value) {
        const movimiento = new MovimientosModel();
        const pago = new PagosModel();

        pago.servicio = this.servicio;

        movimiento.cantidad = result.value;
        movimiento.cuenta = '1';

        this.servicioService.findById(this.servicio).subscribe(data => {
          const vehiculo = data['data'][0]['vehiculo'];
          movimiento.descripcion = `PAGO DEL VEHICULO ${
            vehiculo['marca']['nombre']
          } ${vehiculo['submarca']} CON PLACAS ${vehiculo['placa']}`;

          this.movimientosService.post(movimiento).then(mov => {
            pago.movimiento = mov['data']['_id'];
            this.pagosService.post(pago).then(ok => {
              Swal.fire('Hecho', 'Pago registrado con exito', 'success');
              this.actualizarPagos(this.servicio);
              movimiento.cantidad = (+movimiento.cantidad * -1).toString();
              movimiento.cuenta = '3';
              this.movimientosService.post(movimiento);
            });
          });
        });
      }
    });
  }

  comprobarEstadoDePago() {
    const servicioRef = new ServicioModel();
    servicioRef['_id'] = this.servicio;
    if (this.PAGADO === 0) {
      console.log('Mantener estado');
    } else if (this.TOTAL > this.PAGADO) {
      console.log('Pago incompleto');
      servicioRef.estado = '2';
      this.servicioService.put(servicioRef);
    } else if (this.PAGADO >= this.TOTAL) {
      // console.log('Pago liquidado');
      servicioRef.estado = '3';
      this.servicioService.put(servicioRef);
    }
  }
}
