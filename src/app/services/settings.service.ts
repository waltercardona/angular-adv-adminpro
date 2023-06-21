import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linktemaSeleccionado = document.querySelector('#theme');

  constructor() { 
   // console.log('configuracion desde el servicio que se creo');
    const url =  localStorage.getItem( 'theme') || './assets/css/colors/red.css'
    this.linktemaSeleccionado?.setAttribute('href', url)
    
  }

  cambiarTema(tema:string){
    const url = `./assets/css/colors/${tema}.css`;
    this.linktemaSeleccionado?.setAttribute('href', url)
    localStorage.setItem('theme', url);

    this.checkTema();
   
  }

  checkTema(){
   const links = document.querySelectorAll('.selector');
    links?.forEach( elem => {
      elem.classList.remove('working');
      const temaBoton = elem.getAttribute('data-theme');
      const temaBotonUrl = `./assets/css/colors/${temaBoton}.css`;
      const temaActual = this.linktemaSeleccionado?.getAttribute('href');

      if( temaBotonUrl === temaActual){
          elem.classList.add('working');
      }

     })
    }
}
