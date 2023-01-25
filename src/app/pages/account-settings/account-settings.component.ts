import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  
  //  aqui estoy implementado el servicio que genere con esto mi logica la impleento en el servicio 
  //  para que este ts quede mucho mas sencillo de mirar 

    constructor(private settingsService:SettingsService) {}

    ngOnInit(): void {
      
     this.settingsService.checkTema();
      
    }

    cambiarTema(tema:string){
      this.settingsService.cambiarTema(tema)
     
    }

}
