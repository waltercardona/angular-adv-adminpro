import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';

import {of} from 'rxjs'

import { environment } from '../../environments/environment';
// import { RegisterForm } from '../interfaces/register-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

const base_url = environment.base_url

declare const google :any

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // para trabajar con el hhtp de angular inyectamos el httpclient
  constructor( private http: HttpClient,
              private router:Router,
              private ngZone: NgZone) { }

              


  logout(){
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
    
    // google.accounts.id.revoke('cardonacardona31@gmail.com', ()=>{
    //   // this.ngZone.run(()=>{
        
    //     // })
        
    // })

  }

  //veridicamos el token que tenemos en el localstotage

  verificarToken(): Observable<boolean> {
    // Obtenemos el token almacenado en el localStorage
    const token = localStorage.getItem('token') || '';
  
    // Realizamos la petición para revalidar el token en el backend
    // Para ello, hacemos uso del método http.get() del servicio HttpClient
    // y especificamos la URL a la que queremos acceder y los headers que enviamos
    // en la petición, en este caso el token que obtenemos anteriormente
    return this.http.get(`${base_url}/login/revalidarToken`, {
      headers:{
        'x-token': token
      }
    }).pipe(
      // Usamos el operador tap() para guardar el nuevo token en el localStorage
      tap((resp: any) => {
        localStorage.setItem('token',resp.token)
      }),
      // Usamos el operador map() para transformar la respuesta en un booleano
      map(resp => true),
      // Si ocurre un error en la petición, emitimos false
      catchError(error => of(false))
    );
  }

  



  crearUsuario(formData:RegisterForm){
    // hacenos el llamado http
    return this.http.post(`${base_url}/usuarios`, formData)
        .pipe(
          tap( (resp: any) => {
           localStorage.setItem('token',resp.token)

          })
        )

  }

  // creamos el servicio para el login

  login(formData:LoginForm){

    // hacemos el retorno del llamado al endpoint para el login

    return this.http.post(`${base_url}/login`, formData)
        .pipe(
          tap(
           (resp:any) => {
            localStorage.setItem('token', resp.token)
           }
          )
        )

  }




  // import { RegisterForm } from '../interfaces/register-form.interface';
  // crearUsuario1(formData: any) {
  //   if (formData instanceof RegisterForm) {
  //     return this.http.post(`${base_url}/usuarios`, formData);
  //   } else {
  //     throw new Error('El objeto no coincide con la interfaz RegisterForm');
  //   }
  // }


  // crearUsuario2(formData: RegisterForm) {
  //   if (formData instanceof RegisterForm) {
  //     return this.http.post(`${base_url}/usuarios`, formData);
  //   } else {
  //     throw new Error('El objeto no coincide con la interfaz RegisterForm');
  //   }
  // }

  // crearUsuario(formData: any) {
  //   const expectedProps = ['nombre', 'email', 'password', 'password2', 'terminos'];
  //   const missingProps = expectedProps.filter(prop => !(prop in formData));

  //   if (missingProps.length) {
  //     throw new Error(`El objeto no coincide con la interfaz RegisterForm. Faltan las siguientes propiedades: ${missingProps.join(', ')}`);
  //   }

  //   return this.http.post(`${base_url}/usuarios`, formData);
  // }


  loginGoogle(token:string){
    // hacemos el llamado al endpoint

   return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap(
          (resp:any) => {
            // console.log(resp);
           localStorage.setItem('token', resp.token)
          }
         )
      )


  }




}
