import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAlunoGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {


    if(AuthService.getUser()){
      const role = AuthService.getUser().role;
      if( role == 'USER' || role == 'ADMIN'){
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    } else {
      return false
    }

  }

}
