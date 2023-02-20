
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';



const routes: Routes = [
  //esta es la implementacion de las rutas
  //video 21 vamos a implememtar rutas secundarias
  {
    path:'dashboard',
    component:PagesComponent,
    children: [
      // estas seran las rutas hijas, esta es una forma de implementar las rutas hijas en la app
      { path:'', component:DashboardComponent , data: {titulo:'dashboard'}},
      { path:'progress', component:ProgressComponent,data: {titulo:'Progress'}},
      { path:'grafica1', component: Grafica1Component, data: {titulo:'Grafica 1'}},
      { path:'account-setting', component: AccountSettingsComponent,data: {titulo:'Temas'}},
      { path:'promesas', component: PromesasComponent,data: {titulo:'Promesas'}},
      { path:'rxjs', component: RxjsComponent,data: {titulo:'Rxjs'}},
    //   { path: '', redirectTo:'/dashboard', pathMatch: 'full'},
    ]
  },


  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
