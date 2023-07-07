import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File

  public imgTemp: any  = null

  constructor( public modalImagenServices:ModalImagenService,
                public fileUploadServices: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null
   this.modalImagenServices.cerrarModal()
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

  //implemamtamos la funcion de cambiar la imagen desde el modal

  subirImagen(){
    const id = this.modalImagenServices.id!
    const tipo = this.modalImagenServices.tipo!

    this.fileUploadServices.actualizarFoto(this.imagenSubir,tipo,id)
    .then(img => {
        Swal.fire('Guardado', 'Imagen de usuario Actualizada', 'success');
        this.modalImagenServices.nuevaImagen.emit(img)
        this.cerrarModal()
    }).catch(err => {
      Swal.fire('Error', 'no de pudo subir la imagen', 'error')
    })

    

    
  }


}
