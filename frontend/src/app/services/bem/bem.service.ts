import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bem } from 'src/app/models/Bem.model';
import { environment } from 'src/environment/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BemService {

  private readonly API = environment.apiUrl + '/bem'
  constructor(private http: HttpClient) { }

  buscarTodosBens(): Observable<Bem[]>{
    return this.http.get<Bem[]>(this.API, {headers: AuthService.setHeaders()});
  }

  salvarBem(bem: Bem): Observable<Bem> {
    return this.http.post<Bem>(this.API, bem, {headers:  AuthService.setHeaders()});
  }

  removerBem(idBem: number): Observable<any> {
    return this.http.delete<any>(this.API + '/' + idBem, {headers:  AuthService.setHeaders()});
  }

  editarBem(bem: Bem): Observable<Bem> {
    return this.http.put<Bem>(this.API, bem,  {headers: AuthService.setHeaders()});
  }

  buscarBensPorEstado(estadoBem: string): Observable<Bem[]> {
    return this.http.get<Bem[]>(this.API + '/estado/'+ estadoBem, {headers:  AuthService.setHeaders()});
  }

  buscarBensPorLocal(idLocal: number): Observable<Bem[]> {
    return this.http.get<Bem[]>(this.API + '/local/' + idLocal, {headers:  AuthService.setHeaders()});
  }

  buscarBemPorCodigo(idCodigo: string): Observable<Bem> {
    return this.http.get<Bem>(this.API + '/codigo/' + idCodigo, {headers:  AuthService.setHeaders()});
  }
}
