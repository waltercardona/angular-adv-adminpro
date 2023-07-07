import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
// en este servicio vamos a generar de forma dimanica nuestra barra

// video 67 vamos a fingir un menu con ciertas opciones

menu: any[] = [
  {
    titulo:'Dashboard!!!',
    icono:'mdi mdi-gauge',
    submenu: [
      { titulo: 'Principal', url:'/' },
      { titulo: 'ProgressBar', url:'progress' },
      { titulo: 'Graficas', url:'grafica1' },
      { titulo: 'Promesas', url:'promesas' },
      { titulo: 'Rxjs', url:'rxjs' },
    ]
  },
  {
    titulo:'Mantenimiento',
    icono:'mdi mdi-folder-lock-open',
    submenu: [
      { titulo: 'Usuarios', url:'usuarios' },
      { titulo: 'Hospitales', url:'hospitales' },
      { titulo: 'Medicos', url:'medicos' },
      
    ]
  }
]
  constructor() { }
}
