import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../models/medico.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';
import { Observable } from 'rxjs';

interface medicos {
  ok: boolean;
  medicos: Medico[];
}

// URL base obtenida del archivo environment
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http:HttpClient) { }



  // Getter para obtener el token almacenado en localStorage
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  // Getter para obtener el objeto de encabezado con el token
  get header() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  // Método para cargar los hospitales desde la API
  cargarMedicos(){
    const url = `${base_url}/medicos`;
    return this.http.get<medicos>(url, this.header).pipe(
      map((resp: medicos) => resp.medicos)
    );
  }

  obtenerMedicoPorId(id: string){
    const url = `${base_url}/medicos/${id}`;
    return this.http.get<any>(url, this.header)
      .pipe(
        map( (resp:{ok:boolean, medico: Medico }) => resp.medico)
    );
  }


  crearMedicos(medico:{ nombre:string, hospital:string }){
    // http://localhost:3000/api/medicos
    const url = `${base_url}/medicos`;
    return this.http.post(url,medico, this.header)

  }

  actualizarMedico( medico:Medico ){
    // http://localhost:3000/api/hospitales/642f81393135820612c3f159
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url,medico, this.header)
  }

  borrarMedico( _id:string ){
   
    
    // http://localhost:3000/api/hospitales/642f81393135820612c3f159
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.header)
  
    
  }


}

