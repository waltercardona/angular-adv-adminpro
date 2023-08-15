import { Component, OnInit } from '@angular/core';
import { resolveObjectKey } from 'chart.js/dist/helpers/helpers.core';
import { resolve } from 'chart.js/dist/helpers/helpers.options';
import { SidebarService } from '../../services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // me defino una propiedad
  imgUrl = ''
  //public menuItems: any[]; //para barrer este arreglo ocupo en el html un ngfor
 public usuario:Usuario

// para usar el servico del SidebarService necesito inyectarlo
  constructor( public sidebarService:SidebarService,
    private usuarioServices:UsuariosService) {

      // this.imgUrl = usuarioServices.usuario.imagenUrl

    //this.menuItems = sidebarService.menu;
    
    // console.log(this.menuItems);
    this.usuario = usuarioServices.usuario
   }

  ngOnInit(): void {

    // this.getUsuarios(usuarios => {
    //   console.log(usuarios);
      
    // });
    this.getUsuarios().then(usuarios => {
       console.log(usuarios);
      
    })
    // vamos a hacer un pequeño ejemplo de una promesa para entender un poco mas de su funcionamineto

    //asi no mas esta promesa no es promesa porque se ejecuta de forma sincrona,

    // const promesa = new Promise((resolve, reject) => {
    //     // nota:
    //     // las promesas son muy utilizadas , cuando se quiere realizar tareas, que se tiene que ejecutar de manera
    //     // a destiempo, o bien cuando se necesite ejecutar algo despues de que alguna tarea suceda o cuando algun procedimineto
    //     // termine

    //   if (false) {
    //     resolve('hola mundo');

    //   } else {
    //     reject('hay un error')
    //   }

    // })
    // // ahora si podriamos decir que esta promesa es una promesa ya que la estamos ejecutando
    // // esto lo que vamos a ejecutar cuando la promesa se resuelve, este procedimineto es lo que viene a ser asincrono
    // promesa.then((mensaje)=>{
    //  console.log(mensaje);
    // })
    // .catch(error=> console.log('error en la promesa', error))

    // console.log('fin del intit');

  }

  //en angular es comun usar las promesas de otra manera, usando un metodo 

  getUsuarios(){
//trasformo esto en una nueva promesa para 

   return new Promise( resolve => {

      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data))

    })

  }

}
