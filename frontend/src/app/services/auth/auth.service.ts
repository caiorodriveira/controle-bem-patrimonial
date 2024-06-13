import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/Login.model';
import { environment } from 'src/environment/environment';
import { map } from 'rxjs/operators';
import { Funcionario } from 'src/app/models/Funcionario.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = environment.apiUrl + '/funcionario/login'
  constructor(private http: HttpClient, private route: Router) { }

  login(data: Login): Observable<any> {
    return this.http.post<any>(this.API, data).pipe(
      map(({token, funcionario}) => {
        localStorage.setItem("user-token", token)
        localStorage.setItem("user-data", JSON.stringify({nome: funcionario.nome, cargo: funcionario.cargo, role: funcionario.role}))
      return {nome: funcionario.nome, cargo: funcionario.cargo};
      })
    );
  }

  logout() {
    localStorage.removeItem("user-token");
    localStorage.removeItem("user-data");
    this.route.navigate(['/login']);
  }

  public static getUser(): Funcionario {
    let funcionario: string = String(localStorage.getItem("user-data"));
    return JSON.parse(funcionario) as Funcionario;
  }

  public static setHeaders() {
      const token = String(localStorage.getItem("user-token"));
      return new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token);
  }
}
