import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';
declare function customInitFunction(); 
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'

})
export class PagesComponent implements OnInit {
  year = new Date().getFullYear()

  constructor( private settingsService:SettingsService,
              private sidebarService:SidebarService) { }

  ngOnInit(): void { 
    customInitFunction();
    this.sidebarService.cargarmenu()
  }


 


}
