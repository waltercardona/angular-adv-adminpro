import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private usuarioServices:UsuariosService) { }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioServices.logout()
  }



}
