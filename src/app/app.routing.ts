import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClientesAddComponent } from './pages/clientes/clientes-add/clientes-add.component';
import { ClientesShowComponent } from './pages/clientes/clientes-show/clientes-show.component';
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
import { SettingsMarcasComponent } from './pages/settings/settings-marcas/settings-marcas.component';
import { SettingsMissComponent } from './pages/settings/settings-miss/settings-miss.component';
import { SettingsDepartamentosComponent } from './pages/settings/settings-departamentos/settings-departamentos.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { HtmltopdfComponent } from './pages/htmltopdf/htmltopdf.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { ContabilidadComponent } from './pages/contabilidad/contabilidad.component';
import { ProductosProveedorComponent } from './pages/productos/productos-proveedor/productos-proveedor.component';
import { ManualComponent } from './pages/contabilidad/manual/manual.component';
import { VmostradorComponent } from './pages/vmostrador/vmostrador.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'con/:servicio',
    component: HtmltopdfComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'venta/:servicio',
    component: VentasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'venta-mostrador/:venta',
    component: VmostradorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contabilidad',
    component: ContabilidadComponent,
    children: [{ path: 'manual', component: ManualComponent }],
    canActivate: [AuthGuard]
  },
  { path: 'orden', component: OrdenComponent, canActivate: [AuthGuard] },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'marcas', component: SettingsMarcasComponent },
      { path: 'departamento', component: SettingsDepartamentosComponent },
      { path: 'miss', component: SettingsMissComponent },
      { path: '', redirectTo: 'miss', pathMatch: 'full' }
    ]
  },
  {
    path: 'servicios',
    component: ServiciosComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'show', component: ServiciosShowComponent },
      { path: '', redirectTo: 'show', pathMatch: 'full' }
    ]
  },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'add/:type', component: ProductosAddComponent },
      { path: 'show', component: ProductosShowComponent },
      { path: 'proveedor', component: ProductosProveedorComponent },
      { path: '', redirectTo: 'show', pathMatch: 'full' }
    ]
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'add/:type', component: ClientesAddComponent },
      { path: 'show', component: ClientesShowComponent },
      { path: '', redirectTo: 'show', pathMatch: 'full' }
    ]
  },
  {
    path: 'vehiculos',
    component: VehiculosComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'add/:type', component: VehiculosAddComponent },
      { path: 'show', component: VehiculosShowComponent },
      { path: '', redirectTo: 'show', pathMatch: 'full' }
    ]
  },
  { path: '*', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: []
})
export class AppRoutingModule {}
