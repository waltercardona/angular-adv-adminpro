import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario } from 'src/app/models/usuario.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public usuario!:Usuario

  
  // en este archivo centralizaremos la logica para subir los archivos
  // usaremos el fechapi que es todo propio de javascript
  constructor() { }
  
  get uid(){
    return this.usuario.uid || '';
  }
  // primero hacemos un metodo 

  // este metodo actaura en base a promesas, le anteponemos el asyn para que internamente usar el await

  async actualizarFoto(
    archivo:File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id:string
  ){

    try {
      //recibimos los argumnetos que necesitamos para subir una foto
      const url = `${base_url}/upload/${tipo}/${id}` //con esto tengo el url
      //necesito preparar la data

      const formData = new FormData() // esta es una manara de enviar informacion al backend
      formData.append('imagen', archivo)//ya tengo la data que voy a enviar

      //hacenos la peticion
      const resp = await fetch(url, {
        method: 'PUT',
        headers:{
          'x-token': localStorage.getItem('token') || ''
          
        },
        body: formData // es todo lo que se quiere mandar a la peticion
      }) // con esto hacemos peticines http de una manera muy facil

      
const data = await resp.json()
      if (data.ok) {
        return data.nombreArchivo
      } else {
        console.log(data.msg);
        
        return false
      }
      
      
    } catch (error) {
      console.log(error);
      
      return false
    }
  }

}
