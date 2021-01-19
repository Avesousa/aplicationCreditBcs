import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from './components/auth/models/user.model';
// Auth service
import { UserService } from './components/auth/services/user.service';

@Component({
  selector: 'bcs-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angularBCS';
  cookieValue = null;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    public userService: UserService
  ) {
    userService.getUser().subscribe((res: any) => {
      if (res) {
        let user: User = { ...res };
        switch(user.role) {
          case 'ADMINISTRADOR': {
            user.empleado = 0;
            user.perfil = 'D';
            break;
          }
          case 'OPERADOR': {
            user.empleado = 0;
            user.perfil = 'F';
            break;
          }
          case 'SUPERVISOR': {
            user.empleado = 0;
            user.perfil = 'E';
            break;
          }
          case 'BRANCH': {
            user.empleado = 0;
            user.perfil = 'B';
            break;
          }
          case 'CENTRAL': {
            user.empleado = 2;
            user.perfil = 'D';
            break;
          }
          case 'RETAIL': {
            user.empleado = 0;
            user.perfil = 'A';
            break;
          }
          case 'RRHH': {
            user.empleado = 1;
            user.perfil = 'C';
            break;
          }
        }
        cookieService.set('USER_DATA', JSON.stringify(user));
      }
    });
  }

  init() {
    console.log(this.cookieService.get('USER_DATA'));
  }
}
