import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public imgUrl = ''
  public usuario!:Usuario

  constructor( private usuarioService:UsuariosService,
                private router: Router) { 


  // this.imgUrl = usuarioService.usuario.imagenUrl

  this.usuario = usuarioService.usuario
  }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout()
  }

  buscar(termino:string){
    if (termino.length === 0) {
      return;
      // this.router.navigateByUrl('/dashboard')
      
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`)
    
  }



}
