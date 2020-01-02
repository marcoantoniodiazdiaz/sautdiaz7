import { Component, OnInit } from '@angular/core';
import { DepartamentoModel } from '../../../../models/departamentos.model';
import { DepartamentosService } from '../../../services/departamentos.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings-departamentos',
  templateUrl: './settings-departamentos.component.html',
  styles: []
})
export class SettingsDepartamentosComponent implements OnInit {

  DEPARTAMENTOS: DepartamentoModel[] = [];

  departamento = new DepartamentoModel();

  constructor(private departamentosService: DepartamentosService) {
    this.getDepartamentos();
  }

  getDepartamentos() {
    this.departamentosService.get().subscribe(data => {
      this.DEPARTAMENTOS = data['data'];
    });
  }

  ngOnInit() {
  }

  guardar(form: NgForm) {
    this.departamentosService.post(this.departamento).then(ok => {
      Swal.fire({
        title: this.departamento.nombre,
        text: 'Informacion actualizada',
        type: 'success'
      });

      this.departamento.nombre = '';
      this.getDepartamentos();
    });
  }

}
