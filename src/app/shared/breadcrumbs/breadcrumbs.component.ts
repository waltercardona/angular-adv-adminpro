import { Component, OnInit, OnDestroy } from '@angular/core';
import {  ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy{

  // creamos una propieda para extraer el valor
  titulo!: string
  public tituloSubs$: Subscription

  // vamos a usar los operadores de rxjs para hacer un filtro
  constructor( private router: Router) { 
    this.tituloSubs$ = this.getArgumnetosRuta()
    .subscribe( ({titulo}) => {
      this.titulo = titulo,
      document.title = `AdiminPro-${titulo}`
    })                                  
    

  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumnetosRuta(){
   return this.router.events.pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event:ActivationEnd) => event.snapshot.data)
    )
  }


 


}



 // constructor(private router:Router) {
  //   this.router.events
  //   .pipe(
  //     filter<any>(event => event instanceof ActivationEnd),
  //     filter((event:ActivationEnd) => event.snapshot.firstChild === null ),
  //     map((event:ActivationEnd) => event.snapshot.data)
  //   ).subscribe(({tiulo}) =>{
  //     this.titulo = tiulo.titulo;
  //   })
  //  }

  //   constructor(private router:Router) {
  //   this.router.events
  //   .pipe(
  //     filter((event): event is ActivationEnd => event instanceof ActivationEnd),
  //     filter((event:ActivationEnd) => event.snapshot.firstChild === null ),
  //     map((event:ActivationEnd) => event.snapshot.data)
  //   ).subscribe(console.log);
  //  }
