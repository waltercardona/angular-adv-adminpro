import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;

  public usuario:Usuario

  public imagenSubir!: File

  public imgTemp: any  = null

  constructor( private fb:FormBuilder,
                private usuarioService:UsuariosService,
                private fileUploadServices:FileUploadService) {

               this.usuario = usuarioService.usuario

                 }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre:[this.usuario.nombre, Validators.required],
      email:[this.usuario.email, [Validators.required, Validators.email]],
    })


  }
  actualizarperfil() {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarperfil(this.perfilForm.value)
      .subscribe(resp => {
        console.log(resp);
        
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
  
        Swal.fire({
          title: 'Perfil actualizado',
          text: 'El perfil ha sido actualizado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }, (err) => {
        Swal.fire('Error',err.error.msg, 'error')
        console.log(err.error.msg);
        
      });
  }

  cambiarImagen(event: Event) {
    
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      
      if(!file){
        return this.imgTemp = ''
      }
  
      this.imagenSubir = file

      const reader = new FileReader();
      reader.readAsDataURL(file)

      reader.onloadend = ()=> {
        this.imgTemp = reader.result
        
        
      }

    
      // Resto del código para trabajar con el archivo seleccionado
    }




  }

  subirImagen(){
    this.fileUploadServices.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid || '')
    .then(img => {this.usuario.img = img
    
      Swal.fire({
        title: 'Imagen guardada',
        text: 'Imagen guardada',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).catch(err => {
       
        
        Swal.fire('Error','no se pudo subir la imagen', 'error')
        
      });
    
    })

    

    
  }

// /**
//  * Método para manejar el evento de cambio de imagen.
//  * @param event El objeto Event del evento de cambio.
//  */
// cambiarImagen1(event: File) {
//   // Accedemos al elemento HTML que disparó el evento y lo convertimos en un HTMLInputElement.
//   // Esto nos permite acceder a la propiedad 'files' del elemento.
//   //const file = (event.target as HTMLInputElement)?.files?.[0];
  
//   // Verificamos si se seleccionó un archivo.
//   // if (file) {
//   //   this.imagenSubir = file
//   //   // Resto del código para procesar el archivo...
//   // }
// }

// // subirImagen1(){
// //   this.fileUploadServices.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
// //   .then(img=> console.log(img)
// //   )
// // }

// /**
//  * Método para subir una imagen de usuario.
//  */
// subirImagen() {
//   // Llamada al método 'actualizarFoto()' del servicio 'fileUploadServices' para actualizar la foto.
//   // Pasamos los parámetros correspondientes, como 'imagenSubir', 'usuarios' y 'this.usuario.uid'.
//   // La promesa devuelta por 'actualizarFoto()' se maneja con '.then()' para obtener la respuesta 'img'.
//   this.fileUploadServices.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid || '')
//     .then(img => {
//       // El código dentro de este bloque se ejecutará cuando la promesa se resuelva correctamente.
//       console.log(img); // Mostramos la respuesta 'img' en la consola.
//       // Puedes agregar más código aquí para manejar la respuesta de la actualización de la foto.
//     })
//     .catch(error => {
//       // El código dentro de este bloque se ejecutará si la promesa se rechaza o si ocurre algún error.
//       console.error(error); // Mostramos el error en la consola.
//       // Puedes agregar más código aquí para manejar el error de la actualización de la foto.
//     });
// }

}
