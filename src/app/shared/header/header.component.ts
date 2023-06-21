import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from '../../models/usuario.model';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public imgUrl = ''
  public usuario!:Usuario

  constructor( private usuarioService:UsuariosService) { 


  // this.imgUrl = usuarioService.usuario.imagenUrl

  this.usuario = usuarioService.usuario
  }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout()
  }



}
