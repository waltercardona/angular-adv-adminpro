import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, observable, Subscription } from 'rxjs';
import {map, retry, take, filter} from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {

  //vamos a trabajar con el unsubscribe
  // inplemnentamos el ondestroy

  public intervalSubs : Subscription;

  //vamos a crear un observer
  constructor() { 

       this.intervalSubs = this.retornaIntervalo().subscribe(
        valor => console.log(valor)
  
)
 
    // nos tenemos que suscribir al observable 
    // con el pipe transformamos la informaciona que fluye atraves del observable
    // this.retornaObsevable().pipe(
     
    //   retry(1) // este metodo de los operadores lo usamos cuando el observable fallo, y aun asi queremos volver a interntarlo
    //   // una vez mas o cuantas veces queramos que se intente, este es objetovo del retry(), si al retry no se le manda ningun argumaneo
    //   // lo va a seguir intentando por simepre
    //   // el retry tiene siertos casos especiales en los cuales se pueden utulizar
    // )
    //   .subscribe(
    //   valor => console.log('Subs: ', valor),
    //   error => console.warn('Error', error),
    //   () => console.info('Obs terminado')
      
      
    // )

  }

  //esto usamos con observables que siempre estan emitiendo valores o bien observables que son bastante ruidosos
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe()
  }


  retornaIntervalo(): Observable<number>{
    return interval(300).pipe(
      // take(10),
      map(valor => valor +1),
      filter(valor => (valor %2 === 0) ? true: false),
    )

    
  }

  //hacemos un metodo para retornar el observable

  retornaObsevable(): Observable<number>{
     // usualmemte si quiero hacer referencia a un observable uso el $ obs$
  // asi como las promesas dentro de los ( va el callback o lo que quero que resuelva este observable)
  return new Observable<number>( observer => {
      let i = -1

      // este observer es de este tipo  Subscriber<unknown> lo que significa
      // que el observer es que va estar emitinedo los valores, este nos dice como esta el observable
      // y que informacion esta fluyendo atraves de el
      //  observer: Subscriber<unknown>
     const intervalo = setInterval( ()=>{
        i++;
          observer.next(i); //con esto emitimos el valor de i

        if( i === 4){
          clearInterval(intervalo) //con este limpiamos el intervalo
          observer.complete() 
        }

        if (i === 2) {
          observer.error('i llego al valor de 2') // aqui si es igula a 2 marca el error y termina el observable
        }
        
      }, 1000 )

    });

    // return obs$
  }

 

}



//nota:
// esta seccion es dedicada a los observables.

// clase numero 80 operador map:
// este es el operador quisas mas comun de todos que es el map, 
// map:
// sirve para trasformar la salida de un observable,
//me sirve para trasformar la informacion que recibe  el observable, y mutarla de la manera que yo la 
// necesite, el map recibe el argumento que el observable padre emita.
// map(valor => {
//   return valor + 1
// })
// este operador es muy importar ya que en muchas ocaciones puedo recibir mucha informacion y con este operador
// poder hacer uso solo de las que necesito para que mis observables o mis subscripciones  reciban la info tan 
// pulida como mas se pueda
//take:
// este operador le dice cuantas emiciones el observable se necesitan para completar el observable

//video 81: operador filter( con este operador filtro informacion que fluye dentro de mi observable),
// el orden de los operadores es importante, ya que estos se ejcutan de manera secuancial
// return interval(300).pipe(
//   take(10),
//   map(valor => valor +1),
//   filter(valor => (valor %2 === 0) ? true: false),
// )

// video 83 llamar al unsubscribe:
// en muchas ocaciones vamos a mantener el observable vivo hasta que algo suceda
// ngOnDestroy(): void {
//   this.intervalSubs.unsubscribe()
// }


// video 84: 
// implememtaremos algo en las rutas 
