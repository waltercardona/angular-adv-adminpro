import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  // creamos  propiedad para mostrar los hospitales en el html
  public hospitales: Hospital[] = [];

  public cargando : boolean = true

  public imgSubs!: Subscription

  public hospital :Hospital[] = []
  public  hospitalesTemp:Hospital[] = [];

  constructor(private hospitalServices: HospitalService,
              private modalImagenService: ModalImagenService,
              private busquedasServices: BusquedasService,) { }
              
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

   this.imgSubs = this.imgSubs =  this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => {
      console.log(img);
      
      this.cargarHospitales()
    })
  }

  buscar(termino: string) {
    if (termino.length === 0) {
     this.cargarHospitales()
    } 
      this.busquedasServices.buscar('hospitales', termino)
        .subscribe(
          resp => {
            this.hospitales = resp
          }
          // (resultados: (Usuario | Hospital)[]) => {
          //   console.log(resultados);
            
          //   this.hospitales = resultados.filter(item => item instanceof Hospital) as Hospital[];
          // },
          // (error: any) => {
          //   console.error('Error al buscar hospitales:', error);
          // }
        );
    
  }


  cargarHospitales(){
    this.cargando = true
    // Llamada al método cargarHospitales() del servicio HospitalService
    // para obtener la lista de hospitales
    this.hospitalServices.cargarHospitales()
      .subscribe(hospitales => {
        // Una vez que se obtienen los hospitales, se ejecuta la función
        // de devolución de llamada definida dentro de subscribe()
        // En este caso, simplemente imprimimos los hospitales en la consola
      this.cargando = false
      this.hospitales = hospitales

      })
  }

  guardarcambios(hospital:Hospital){

    this.hospitalServices.actualizarHospital(hospital._id, hospital.nombre)
        .subscribe(resp => {
          Swal.fire('Actualizado', hospital.nombre, 'success')
          
        })
    
  }

  eliminarHospital(hospital:Hospital){

    console.log(hospital._id)
    console.log(hospital);
    
    this.hospitalServices.borrarHospital(hospital._id, )
    
    .subscribe(resp => {
         
          console.log(resp);
          
          Swal.fire('Borrado', hospital.nombre, 'success')
          this.cargarHospitales()
          
        })
        
      }
      
      async abrirModal(){
        const {value} = await Swal.fire<string>({
          title:'Crear Hospital',
          text: 'Ingrese el nuevo hospital',
          input: 'text',
          showCancelButton: true,
          inputPlaceholder: 'Nombre del hospital',
        })
        console.log(value);
        
        
        if (value !== undefined && value.trim().length > 0) {
          
          this.hospitalServices.crearHospitales(value)
          .subscribe((resp: any) => {
            this.hospitales.push(resp.hospital)
        // this.cargarHospitales()
        console.log(resp);
        
      })
    }

  }

  abrirModalFoto(hospital: Hospital){
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img)
  }



  buscar1(termino:string){

    if (termino.length === 0) {
      return this.hospitales =  this.hospitalesTemp
    }
    this.busquedasServices.buscar('hospitales', termino)
      .subscribe(resultados => {
        console.log(resultados);
        
        //this.hospitales = resultados
      }
      )
    
  }
}
