import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios:Usuario[] = [];
  public usuariosTemp:Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  public imgSubs!:Subscription


  constructor( private usuarioServices: UsuariosService,
              private busquedasServices: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
   this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs =  this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => {
      console.log(img);
      
      this.cargarUsuarios()
    })
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioServices.cargarUsuarios(this.desde)
    .subscribe(({total, usuarios}) => {
      this.totalUsuarios = total;
      if (usuarios.length !== 0) {
        this.usuarios = usuarios
        this.usuariosTemp = usuarios
        this.cargando = false;
      
     }
      
    })
  }

  cambiarpagina(valor:number){
    this.desde += valor

    if (this.desde <0) {
      this.desde = 0
    } else if( this.desde > this.totalUsuarios){
      this.desde -= valor
    }

    this.cargarUsuarios()
  }


  buscar(termino:string){

    if (termino.length === 0) {
      return this.usuarios =  this.usuariosTemp
    }
    this.busquedasServices.buscar('usuarios', termino)
      .subscribe(resultados => {
        this.usuarios = resultados
      }
      )
    
  }


  eliminarUsuario(usuario: Usuario){

    if (usuario.uid === this.usuarioServices.uid) {
      return Swal.fire('Error', 'No puede borrarse asi mismo', 'error')
      
    }
  
    Swal.fire({
      title: 'Borrar Usuario?',
      text: `esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrarlo'
    }).then((result) => {
      if (result.value) {
      this.usuarioServices.eliminarUsuario(usuario)
        .subscribe(resp => {
          Swal.fire(
            'Usuario borrado',
            `${usuario.nombre}fue elimniado correctamente `,
            'success'
          );
          this.cargarUsuarios()
        })
      }
    })
    
  }

  cambiarRole(usuario:Usuario){
    this.usuarioServices.guardarUsuario(usuario)
        .subscribe(resp => {
          console.log(resp)
          
        })
    
  }


  abrirModal(usuario:Usuario){
    console.log(usuario.img);

    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img)
    
  }

}
