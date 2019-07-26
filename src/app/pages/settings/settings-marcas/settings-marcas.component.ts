import { Component, OnInit } from '@angular/core';
import { MarcasModel } from '../../../../models/marcas.model';
import { MarcasService } from '../../../services/marcas.service';

@Component({
  selector: 'app-settings-marcas',
  templateUrl: './settings-marcas.component.html',
  styles: []
})
export class SettingsMarcasComponent implements OnInit {

  MARCAS: MarcasModel[] = [];

  constructor(private marcasService: MarcasService) {
    marcasService.get().subscribe((data) => {
      this.MARCAS = data['data'];
    });
  }

  ngOnInit() {
  }


}
