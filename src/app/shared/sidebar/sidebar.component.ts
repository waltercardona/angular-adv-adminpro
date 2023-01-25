import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // me defino una propiedad
  menuItems: any[]; //para barrer este arreglo ocupo en el html un ngfor
  
// para usar el servico del SidebarService necesito inyectarlo
  constructor( private sidebarService:SidebarService) {

    this.menuItems = sidebarService.menu;
    console.log(this.menuItems);
    

   }

  ngOnInit(): void {
  }

}
