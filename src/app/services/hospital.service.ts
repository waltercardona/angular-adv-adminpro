import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

// Interfaz para definir la estructura de la respuesta de la API
interface Hospitales {
  ok: boolean;
  hospitales: Hospital[];
}

// URL base obtenida del archivo environment
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

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
  cargarHospitales(): Observable<Hospital[]> {
    const url = `${base_url}/hospitales`;
    return this.http.get<Hospitales>(url, this.header).pipe(
      map((resp: Hospitales) => resp.hospitales)
    );
  }


  crearHospitales(nombre:string){
    // http://localhost:3000/api/hospitales
    const url = `${base_url}/hospitales`;
    return this.http.post(url,{nombre}, this.header)

  }

  actualizarHospital(_id:string, nombre:string, ){
    // http://localhost:3000/api/hospitales/642f81393135820612c3f159
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url,{nombre}, this.header)
  }

  borrarHospital( _id:string ){
   
    
    // http://localhost:3000/api/hospitales/642f81393135820612c3f159
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url, this.header)
  
    
  }





}