import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagesfoundComponent } from './pages/nopagesfound/nopagesfound.component';
import { PagesComponent } from './pages/pages.component';


const routes:Routes = [
  //esta es la implementacion de las rutas
  //video 21 vamos a implememtar rutas secundarias
  {
    path:'',
    component:PagesComponent,
    children: [
      // estas seran las rutas hijas, esta es una forma de implementar las rutas hijas en la app
      { path:'dashboard', component:DashboardComponent },
      { path:'progress', component:ProgressComponent },
      { path:'grafica1', component: Grafica1Component},
      { path: '', redirectTo:'/dashboard', pathMatch: 'full'},
    ]
  },


  { path:'register',component:RegisterComponent },
  { path:'login', component:LoginComponent },

  { path: '**', component: NopagesfoundComponent }

]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[ RouterModule ]
})
export class AppRoutingModule { }
