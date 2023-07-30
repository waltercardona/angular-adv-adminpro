import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { ModalImagenComponent } from '../../../components/modal-imagen/modal-imagen.component';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html'
  
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando:boolean = true;
  public medicos:Medico[] = [];
  private imgSubs!:Subscription

  constructor(private medicoService: MedicoService,
              private modalImagenService:ModalImagenService,
              private busquedasServices: BusquedasService) { }
  ngOnDestroy(): void {
   this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarMedicos();

    this.imgSubs = this.imgSubs =  this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => {
      console.log(img);
      
      this.cargarMedicos()
    })
  }

  buscar(termino: string) {
    if (termino.length === 0) {
     this.cargarMedicos()
    } 
      this.busquedasServices.buscar('medicos', termino)
        .subscribe(
          resp => {
            this.medicos = resp
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


  cargarMedicos(){
    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos
        console.log(medicos);
        
      })
  }

  abrirModalFoto(medico: Medico){
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img)
  }

  borrarmedico(medico:Medico){
    Swal.fire({
      title: 'Borrar ese medico?',
      text: `esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrarlo'
    }).then((result) => {
      if (result.value) {
      this.medicoService.borrarMedico(medico._id)
        .subscribe(resp => {
          Swal.fire(
            'Medico borrado',
            `${medico.nombre}fue elimniado correctamente `,
            'success'
          );
          this.cargarMedicos()
        })
      }
    })
  }
}
