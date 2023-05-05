import { Component } from '@angular/core';
import Swal from 'sweetalert2'

import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { RegisterForm } from 'src/app/interfaces/register-form.interface';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {



  public formularioPosteado = false;

  // vamos a capturar la informacion del formulario
 public formularioDeRegistro = this.fb.group({
    // aqui adentro defino los campos del formulario
    nombre:['walter', [Validators.required , Validators.minLength(2) ]] ,
    email:['walter100@gmail.com', [Validators.required, Validators.email]],
    password:['123456', Validators.required],
    password2:['123456', Validators.required],
    terminos:[true, Validators.required]
   },{
    // validators: this.passwordIguales1.bind(this),
    validators: this.validarContraseñas('password', 'password2')
    // validators: this.passwordIguales('password1', 'password2')
   })

   constructor(private fb:FormBuilder,
               private usuarioService:UsuariosService,
               private router:Router) { }

  // definimos el metodo para crear el usario

  crearUsuario(){
    this.formularioPosteado = true
    console.log(this.formularioDeRegistro.value);
    // console.log(this.formularioDeRegistro);

    if (this.formularioDeRegistro.invalid) {
   
      return;
    } 

    
    // this.usuarioService.crearUsuario(this.formularioDeRegistro.value).subscribe(resp => {
      //   console.log(resp);
      
      // })
      
      // si llega aqui es por que el fromulario es valido y realizamos la cracion
    const formData = Object.assign({}, this.formularioDeRegistro.value) as RegisterForm;

    // this.usuarioService.crearUsuario(formData).subscribe(resp => {
    //   console.log('usuario creado');
    //   console.log(resp)
    // }, (err) => {
    //   // si sucede un error
    //   Swal.fire('Error', err.error.msg, 'error')
    // })

    this.usuarioService.crearUsuario(formData).subscribe({
      next: resp => {
        this.router.navigateByUrl('/');
      },
      error: err => {
        // si sucede un error
        Swal.fire('Error', err.error.msg, 'error')
      }
    });


    
    // const formData: RegisterForm = {
    //   nombre: this.formularioDeRegistro.get('nombre')?.value || '',
    //   email: this.formularioDeRegistro.get('email')?.value || '',
    //   password: this.formularioDeRegistro.get('password')?.value || '',
    //   password2: this.formularioDeRegistro.get('password2')?.value || '',
    //   terminos: this.formularioDeRegistro.get('terminos')?.value || false,
    // };

    // this.usuarioService.crearUsuario(this.formularioDeRegistro.value).subscribe(resp=>{
    //   console.log('usuario creado');
      
    //   console.log(resp);
      
    // }, (err) => {
    //   console.warn(err)
    // })
    
  }

  campoNoValido(campo):boolean{
   if (this.formularioDeRegistro.get(campo)?.invalid && this.formularioPosteado) {
    return true
   } else {
    return false
   }
  }

  contrasenas(){
    // creamos las dos variables para llamar lo que capture en el campo del formulario

    const pass1 = this.formularioDeRegistro.get('password')?.value;
    const pass2 = this.formularioDeRegistro.get('password2')?.value;

    // hacemos una condicion para compararlos si son iguales

    if ((pass1 !== pass2 ) && this.formularioPosteado) {
      return true;
    } else {
      return false;
    }
  }

  passwordIguales(passName1:string, passName2:string) {

    return (formGroup: FormGroup) => {
      const pass1 = formGroup.get(passName1)
      const pass2 = formGroup.get(passName2)
     
      if (pass1 !== pass2) {
        pass2?.setErrors({ noEsIgual: true })
      } else {
        pass2?.setErrors(null)
        
      }
    }

    }

    passwordIguales1(formGroup: FormGroup) {
      const pass1 = formGroup.get('password')?.value;
      const pass2 = formGroup.get('password2')?.value;
      if (pass1 !== pass2) {
        formGroup.get('password2')?.setErrors({ noEsIgual: true });
      } else {
        formGroup.get('password2')?.setErrors(null);
      }
    }


    validarContraseñas(pass1: string, pass2: string): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} | null => {
        const pass1Value = control.get(pass1)?.value;
        const pass2Value = control.get(pass2)?.value;
        
        if (pass1Value !== pass2Value) {
          return { contraseñasNoCoinciden: true };
        } else {
          return null;
        }
      };
    }


  aceptaTerminos(){
    return !this.formularioDeRegistro.get('terminos')?.value && this.formularioPosteado
  }




 

}
