import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url



@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get header(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios(resultados: any[]):Usuario[]{
    return resultados.map(
      user => new Usuario(user.nombre, 
        user.email, user.img, user.role,'', user.uid, user.google)
    )
  }
  private transformarHospitales1(resultado: any[]): Hospital[] {
    return resultado.map(hospital => new Hospital(
      hospital.nombre,
      hospital._id,
      hospital.img,
      hospital.usuario // Suponiendo que el campo usuario también está presente en los datos
    ));
  }
  private transformarHospitales(resultado: any[]): Hospital[] {
    return resultado;
  }
  private transformarMedicos(resultado: any[]):Medico[] {
    return resultado;
  }



  buscar1(tipo:'usuarios'| 'medicos' | 'hospitales',
          termino:string){
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`
    return this.http.get<any[]>(url, this.header)
            .pipe(
              map( (resp:any) => {
                switch (tipo) {
                  case 'usuarios':
                    return this.transformarUsuarios(resp.resultados)
                  case 'hospitales':
                      return this.transformarHospitales(resp.resultado)
                  default:
                    return []
                }
              })
            )
  }


  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string): Observable<any[]> {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
  
    return this.http.get<any[]>(url, this.header).pipe(
      filter((resp: any) => resp !== undefined), // Filtrar resultados undefined
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.resultados);
          case 'hospitales':
            return this.transformarHospitales(resp.resultados);
          case 'medicos':
            return this.transformarMedicos(resp.resultados); // Si tienes una función para transformar médicos.
          default:
            return [];
        }
      })
    );
  }

}
