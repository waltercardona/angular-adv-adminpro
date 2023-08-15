import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';

import {of} from 'rxjs'

import { environment } from '../../environments/environment';
// import { RegisterForm } from '../interfaces/register-form.interface';
// import { Usuario } from 'src/app/models/usuario.model';
import { Usuario } from '../models/usuario.model';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { ActualizarPerfil } from '../interfaces/actualizarPerfil.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interfaces';

const base_url = environment.base_url

declare const google :any

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

public usuario!: Usuario

  // para trabajar con el hhtp de angular inyectamos el httpclient
  constructor( private http: HttpClient,
              private router:Router,
              private ngZone: NgZone) {
                
               }

              
    get token():string{
      return localStorage.getItem('token') || '';
    }

    get role(): 'ADMIN_ROLE' | ' USER_ROLE'{
      return this.usuario.role
    }

    get uid():string{
      return this.usuario.uid || '';
    }

    get header(){
      return {
        headers: {
          'x-token': this.token
        }
      }
    }

    guardarlocalStorage(token: string, menu:any){
      localStorage.setItem('token',token)
      localStorage.setItem('menu', JSON.stringify(menu))

    }

  logout(){
    localStorage.removeItem('token')
     localStorage.removeItem('menu')

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
      map((resp: any) => {
        console.log(resp);

        const {nombre,email,img='',role,uid, google} = resp.usuario
        this.usuario = new Usuario(nombre, email, img ,role,google, uid);
       
        
        // const {  nombre, email, img , google, role, uid} = resp.usuario

        // this.usuario = new Usuario(nombre, email,'', img,google,role,uid )
       this.guardarlocalStorage(resp.token, resp.menu)
      
        return true

      }),
      // map(resp => true),
      // Usamos el operador map() para transformar la respuesta en un booleano
    
      // Si ocurre un error en la petición, emitimos false
      catchError(error => of (false))
    );
  }

  



  crearUsuario(formData:RegisterForm){
    // hacenos el llamado http
    return this.http.post(`${base_url}/usuarios`, formData)
        .pipe(
          tap( (resp: any) => {
            this.guardarlocalStorage(resp.token, resp.menu)

          })
        )

  }


  // Actualizarperfils(data:ActualizarPerfil){

  //   return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
  //     headers:{
  //       'x-token': this.token
  //     }
  //   });

  // }

  actualizarperfil(data: { email: string, nombre: string, role: string}) {
   
    data = {
      ...data,
      role: this.usuario.role || ''
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  // Actualizarperfil1( data:{email:string,nombre:string, role: string}){

  //   data = {
  //     ...data,
  //     role: this.usuario.role
  //   }

  //   return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
  //     headers:{
  //       'x-token': this.token
  //     }
  //   });

  // }

  // creamos el servicio para el login

  login(formData:LoginForm){

    // hacemos el retorno del llamado al endpoint para el login

    return this.http.post(`${base_url}/login`, formData)
        .pipe(
          tap(
           (resp:any) => {
            this.guardarlocalStorage(resp.token, resp.menu)
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
            this.guardarlocalStorage(resp.token, resp.menu)
          }
         )
      )


  }


  cargarUsuarios(desde:number = 0){
    // localhost:3000/api/usuarios?desde=0
    const url = `${base_url}/usuarios?desde=${desde}`
    return this.http.get<CargarUsuario>(url, this.header)
      .pipe(
        delay(5),
        map(resp => {
         console.log(resp.usuarios);
         

          const usuarios = resp.usuarios.map( 
            user => new Usuario(user.nombre, 
              user.email, user.img, user.role,'', user.uid, user.google))
          
          return {
            total: resp.total,
            usuarios
          }
        })
      )
  }


  eliminarUsuario(usuario:Usuario){
    // usuarios/641281429c880dd40baa053f
    
    const url = `${base_url}/usuarios/${usuario.uid}`
    return this.http.delete(url, this.header)
  }



  guardarUsuario(usuario:Usuario) {
   
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.header )
    
  }




}
