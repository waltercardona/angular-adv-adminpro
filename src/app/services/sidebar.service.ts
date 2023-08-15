import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
// en este servicio vamos a generar de forma dimanica nuestra barra

// video 67 vamos a fingir un menu con ciertas opciones

public menu:any[] = [];

cargarmenu() {

  this.menu = JSON.parse(localStorage.getItem('menu')!) || [];

  // Obtiene el valor almacenado en 'menu' desde el almacenamiento local
  // const menuValue = localStorage.getItem('menu');

  // // Si el valor no es nulo, analiza la cadena JSON y asigna el resultado a 'this.menu'
  // if (menuValue !== null) {
  //   this.menu = JSON.parse(menuValue);
  // } else {
  //   // Si el valor es nulo, asigna un arreglo vacío a 'this.menu'
  //   this.menu = [];
  // }
}

// menu: any[] = [
//   {
//     titulo:'Dashboard!!!',
//     icono:'mdi mdi-gauge',
//     submenu: [
//       { titulo: 'Principal', url:'/' },
//       { titulo: 'ProgressBar', url:'progress' },
//       { titulo: 'Graficas', url:'grafica1' },
//       { titulo: 'Promesas', url:'promesas' },
//       { titulo: 'Rxjs', url:'rxjs' },
//     ]
//   },
//   {
//     titulo:'Mantenimiento',
//     icono:'mdi mdi-folder-lock-open',
//     submenu: [
//       { titulo: 'Usuarios', url:'usuarios' },
//       { titulo: 'Hospitales', url:'hospitales' },
//       { titulo: 'Medicos', url:'medicos' },
      
//     ]
//   }
// ]
  
}
