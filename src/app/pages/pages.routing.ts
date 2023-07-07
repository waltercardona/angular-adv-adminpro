import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimientos
import { UsuariosComponent } from './manteniminetos/usuarios/usuarios.component';

// Definimos las rutas y sus respectivos componentes
const routes: Routes = [
  {
    // Ruta principal
    path: 'dashboard',
    component: PagesComponent,
    // Protegemos la ruta con el guard AuthGuard para que solo los usuarios autenticados puedan acceder
    canActivate: [AuthGuard],
    // Rutas hijas de la ruta principal
    children: [
      // Ruta para el componente DashboardComponent
      { path: '', component: DashboardComponent, data: { titulo: 'dashboard' } },
      // Ruta para el componente ProgressComponent
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
      // Ruta para el componente Grafica1Component
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica 1' } },
      // Ruta para el componente AccountSettingsComponent
      { path: 'account-setting', component: AccountSettingsComponent, data: { titulo: 'Temas' } },
      // Ruta para el componente PromesasComponent
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
      // Ruta para el componente RxjsComponent
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
       // Ruta para el componente PerfilComponent
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },

      //Mantenimientos
      {path: 'usuarios', component: UsuariosComponent, data:{titulo: 'Usuarios de aplicacion'}}
    ]
  },
];

@NgModule({
  // Importamos el módulo de rutas de Angular y lo configuramos con las rutas definidas
  imports: [RouterModule.forChild(routes)],
  // Exportamos el módulo de rutas para que pueda ser utilizado en otros módulos
  exports: [RouterModule]
})
export class PagesRoutingModule { }
