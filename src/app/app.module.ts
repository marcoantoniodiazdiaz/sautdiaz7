import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClientesAddComponent } from './pages/clientes/clientes-add/clientes-add.component';
import { ClientesShowComponent } from './pages/clientes/clientes-show/clientes-show.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ColorPickerModule } from 'ngx-color-picker';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { VehiculosAddComponent } from './pages/vehiculos/vehiculos-add/vehiculos-add.component';
import { VehiculosShowComponent } from './pages/vehiculos/vehiculos-show/vehiculos-show.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ServiciosShowComponent } from './pages/servicios/servicios-show/servicios-show.component';
import { OrdenComponent } from './pages/orden/orden.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductosAddComponent } from './pages/productos/productos-add/productos-add.component';
import { ProductosShowComponent } from './pages/productos/productos-show/productos-show.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SettingsMissComponent } from './pages/settings/settings-miss/settings-miss.component';
import { SettingsMarcasComponent } from './pages/settings/settings-marcas/settings-marcas.component';
import { SettingsDepartamentosComponent } from './pages/settings/settings-departamentos/settings-departamentos.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { VentasProductosComponent } from './pages/ventas/ventas-productos/ventas-productos.component';
import { VentasAddComponent } from './pages/ventas/ventas-add/ventas-add.component';
import { VentasNolistadoComponent } from './pages/ventas/ventas-nolistado/ventas-nolistado.component';
import { VentasPrintComponent } from './pages/ventas/ventas-print/ventas-print.component';
import { HtmltopdfComponent } from './pages/htmltopdf/htmltopdf.component';
import { LoginComponent } from './pages/login/login.component';
import { ContabilidadComponent } from './pages/contabilidad/contabilidad.component';
import { ProductosProveedorComponent } from './pages/productos/productos-proveedor/productos-proveedor.component';
import { ManualComponent } from './pages/contabilidad/manual/manual.component';
import { VmostradorComponent } from './pages/vmostrador/vmostrador.component';
import { VmostradorProductosComponent } from './pages/vmostrador/vmostrador-productos/vmostrador-productos.component';
// import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// ANGULAR MATERIAL
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatInputModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ClientesComponent,
    ClientesAddComponent,
    ClientesShowComponent,
    VehiculosComponent,
    VehiculosAddComponent,
    VehiculosShowComponent,
    ServiciosComponent,
    ServiciosShowComponent,
    OrdenComponent,
    ProductosComponent,
    ProductosAddComponent,
    ProductosShowComponent,
    SettingsComponent,
    SettingsMissComponent,
    SettingsMarcasComponent,
    SettingsDepartamentosComponent,
    VentasComponent,
    VentasProductosComponent,
    VentasAddComponent,
    VentasNolistadoComponent,
    VentasPrintComponent,
    HtmltopdfComponent,
    LoginComponent,
    ContabilidadComponent,
    ProductosProveedorComponent,
    ManualComponent,
    VmostradorComponent,
    VmostradorProductosComponent
  ],
  imports: [
    ColorPickerModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
    // NgbModule,
    // NgbDatepicker,
    // NgbDatepickerService,
    // NgbDatepickerModule
    // NgbPaginationModule,
    // MATERIAL
    // MatDatepickerModule,
    // MatFormFieldModule,
    // MatNativeDateModule,
    // MatInputModule
    //
  ],
  exports: [
    // MATERIAL
    // MatDatepickerModule,
    // MatFormFieldModule
    //
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
