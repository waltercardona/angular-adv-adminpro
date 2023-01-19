import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'
})
export class IncrementadorComponent implements OnInit {
  ngOnInit(){
   this.btnClass = `btn ${this.btnClass}`
  }

//para trabajar con la informacion que se le pueda pasar a los componentes hijos usasmos el decorador input
  // @Input() progreso: number = 60 //podemos renombrar el nombre que le dimos (***) dentro  iria el nombre que le quiero dar
  @Input('valor') progreso: number = 6 // esta seria una manera de renombrar el argumento que estemos esperando que nos envien desde el padre 
  // hacemos un get para user el progreso

  //implemnentamos un input para cambiar el color
  @Input() btnClass: string = ' btn-primary'

  // get getprogreso(){
  //   return `${this.progreso}% `
  // }

  //hacemos una funcion para intrementar o disminuir la progreso de la barra


  //vamos a usar el output este es para emitir
  // usualmente los outputs son de tipo evenemiter

  @Output() valorsalida: EventEmitter<number> = new EventEmitter()


  cambiarValor(valor: number ){

    if (this.progreso >= 100 && valor  >=0) {
      this.valorsalida.emit(100)
      return this.progreso = 100
    }

    if (this.progreso <= 0 && valor  < 0) {
      this.valorsalida.emit(0)
      return this.progreso = 0
    }

    this.progreso = this.progreso + valor
    this.valorsalida.emit(this.progreso)

  }
}
