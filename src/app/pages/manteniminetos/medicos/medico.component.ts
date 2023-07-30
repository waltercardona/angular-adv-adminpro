import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Hospital } from 'src/app/models/hospital.model';

import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html'
  
})
export class MedicoComponent implements OnInit {

  // creaos la propiedad para el formulario

  public medicoForm!: FormGroup
  public hospitales: Hospital[] = []
  
  public hospitalSeleccionado: Hospital | undefined
  public medicoSeleccionado!: Hospital

  constructor( private fb: FormBuilder,
                private hospitalService: HospitalService,
                private medicoService: MedicoService,
                private router:Router,
                private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
  

    this.activateRoute.params.subscribe(({id}) => {
      // console.log(id);
      
      this.cargarmedico(id)
      
    })

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.cargarHospitales();
    // vamos a crear un observable para escuchar los hospitaes

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(hospitalId =>{
       
       this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);
      //  console.log(this.hospitalSeleccionado);
       
        
      })

  }

  cargarmedico(id:string){

    if (id === 'nuevo') {
      return;
    }
      this.medicoService.obtenerMedicoPorId(id)
      .pipe(
        delay(100)
      )
        .subscribe(medico => {
          if (!medico) {
            return this.router.navigateByUrl(`/dashboard/medicos`)
          }
          const {nombre, hospital:{_id}} = medico
         this.medicoSeleccionado = medico
          this.medicoForm.setValue({nombre, hospital:_id})
        })

  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales().subscribe((hospitales: Hospital[]) => {
     
     
      this.hospitales = hospitales
    })
  }


  guardarMedico(){
    const {nombre} =this.medicoForm.value
    console.log(this.medicoSeleccionado);
    if (this.medicoSeleccionado) {
      //actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico(data)
      .subscribe(resp=> {
        console.log(resp);
        
        Swal.fire('Actualizado',`${nombre} Actualizado correctamente`, 'success')
      })
    } else {
      
     
      this.medicoService.crearMedicos(this.medicoForm.value)
        .subscribe((resp:any) => {
          Swal.fire('Creado',`${nombre} creado correctamente`, 'success')
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
          
        })
      
    }


    
  }

}
