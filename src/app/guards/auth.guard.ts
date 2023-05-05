import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})

/**
 * El guard AuthGuard se encarga de proteger las rutas de la aplicación.
 * Comprueba si el usuario está autenticado antes de permitir el acceso a una ruta.
 * Si el usuario no está autenticado, redirige a la página de inicio de sesión.
 */
export class AuthGuard implements CanActivate {

  /**
   * Inyectamos el servicio UsuariosService y el router para utilizar sus métodos.
   * @param usuarioServices Servicio que permite verificar si el usuario está autenticado.
   * @param router Objeto que nos permite navegar entre rutas.
   */
  constructor(private usuarioServices: UsuariosService, private router: Router) {}

  /**
   * Método que se ejecuta al intentar acceder a una ruta protegida.
   * Comprueba si el usuario está autenticado y redirige a la página de inicio de sesión si no lo está.
   * @param route Información sobre la ruta a la que se intenta acceder.
   * @param state Información sobre el estado actual de la aplicación.
   * @returns Un observable que emite un valor booleano que indica si el usuario está autenticado o no.
   * Si el valor es true, permite el acceso a la ruta protegida.
   * Si el valor es false, redirige a la página de inicio de sesión.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.usuarioServices.verificarToken().pipe(
      tap((estaAutenticado) => {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión.
        if (!estaAutenticado) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
