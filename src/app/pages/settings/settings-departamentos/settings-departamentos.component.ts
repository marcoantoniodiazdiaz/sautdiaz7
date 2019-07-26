import { Component, OnInit } from '@angular/core';
import { DepartamentoModel } from '../../../../models/departamentos.model';
import { DepartamentosService } from '../../../services/departamentos.service';

@Component({
  selector: 'app-settings-departamentos',
  templateUrl: './settings-departamentos.component.html',
  styles: []
})
export class SettingsDepartamentosComponent implements OnInit {

  DEPARTAMENTOS: DepartamentoModel[] = [];

  constructor(private marcasService: DepartamentosService) {
    marcasService.get().subscribe(data => {
      this.DEPARTAMENTOS = data['data'];
    });
  }

  ngOnInit() {
  }

}
