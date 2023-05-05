


import { AfterViewInit, Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

// Declaramos la variable global "google" para usar la API de Google
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  // Capturamos si el formulario fue posteado
  public formularioPosteado = false;

  // Creamos un FormGroup para manejar el formulario de login
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remenber: [false]
  });

  // El botón de Google Sign-In
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioServices: UsuariosService,
    private ngZone: NgZone // Agrega NgZone en el constructor
   
  ) { }

  ngAfterViewInit(): void {
    // Inicializamos el botón de Google Sign-In
    this.googleInit();
  }

  // Inicializamos la API de Google
 
  googleInit(): void {
    this.ngZone.runOutsideAngular(() => { // Llama a runOutsideAngular
        google.accounts.id.initialize({
            client_id: '946197767407-kls7rlis9nlo32uecti0uqejlkk0j5p0.apps.googleusercontent.com',
            callback: (response) => this.handleCredentialResponse(response)
        });
        google.accounts.id.renderButton(
            this.googleBtn.nativeElement,
            { theme: "outline", size: "large" } // personalización del botón
        );
    });
}


  // Función para manejar la respuesta del botón de Google Sign-In

  handleCredentialResponse(response: any): void {
    this.ngZone.run(() => { // Llama a run
        this.usuarioServices.loginGoogle(response.credential).subscribe(
            resp => {
                // Si el usuario inicia sesión exitosamente, redireccionamos al home
                this.router.navigateByUrl('/');
            }
        );
    });
}


  // Función para iniciar sesión con el formulario de login
  login(): void {
    // Obtenemos los valores del formulario
    const formData = Object.assign({}, this.loginForm.value) as LoginForm;

     // vamos a trabajarar con el recuerdame
      // validamos si el usuario quiere que se recuerde en el localstorege

    // Llamamos al servicio para iniciar sesión
    this.usuarioServices.login(formData).subscribe(
      resp => {
        // Si el usuario quiere recordar su email, lo guardamos en localStorage
        if (this.loginForm.get('remenber')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value || '');
        } else {
          localStorage.removeItem('email');
        }

        this.ngZone.run(()=>{

          // Redireccionamos al home
          this.router.navigateByUrl('/');
        })
      },
      // Si hay un error, mostramos una alerta
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

}

