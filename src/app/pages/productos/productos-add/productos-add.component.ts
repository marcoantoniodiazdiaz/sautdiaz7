import { Component, OnInit } from '@angular/core';
import { ProductosModel } from 'src/models/productos.model';
import { ProductosService } from '../../../services/productos.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { DepartamentoModel } from '../../../../models/departamentos.model';
import { DepartamentosService } from '../../../services/departamentos.service';

@Component({
  selector: 'app-productos-add',
  templateUrl: './productos-add.component.html',
  styles: []
})
export class ProductosAddComponent implements OnInit {

  producto = this.productosService.producto;
  mode: string;

  DEPARTAMENTOS: DepartamentoModel[] = [];

  constructor(private productosService: ProductosService, private router: ActivatedRoute,
              private departamentosService: DepartamentosService) {
    router.params.subscribe(data => {
      this.mode = data['type'];
      if (data['type'] === 'new') {
        this.producto = new ProductosModel();
      } else {
        this.producto = this.productosService.producto;
        this.producto.departamento = this.producto.departamento['_id'];
      }
    });

    this.getDepartamentos();
  }

  ngOnInit() {
  }

  getDepartamentos() {
    this.departamentosService.get().subscribe(data => {
      this.DEPARTAMENTOS = data['data'];
    });
  }

  guardar(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Algunos campos son obligatorios',
        type: 'warning',
        allowOutsideClick: false
      });
      return;
    }

    Swal.fire({
      title: 'Procesando',
      text: 'Guardando informacion',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.producto.nombre = this.producto.nombre.toUpperCase();

    if (this.mode === 'edit') {
      this.productosService.put(this.producto).then(ok => {
        Swal.fire({
          title: this.producto.nombre,
          text: 'Informacion actualizada correctamente',
          type: 'success'
        });
      });
    } else {
      this.productosService.post(this.producto).then(ok => {
        Swal.fire({
          title: this.producto.nombre,
          text: 'Informacion agregada correctamente',
          type: 'success'
        });
      });
    }
  }

}
