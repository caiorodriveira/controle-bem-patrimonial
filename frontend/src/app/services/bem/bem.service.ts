import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bem } from 'src/app/models/Bem.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BemService {

  private readonly API = environment.apiUrl + '/bem'
  constructor(private http: HttpClient) { }

  buscarTodosBens(): Observable<Bem[]>{
    return this.http.get<Bem[]>(this.API);
  }

  salvarBem(bem: Bem): Observable<Bem> {
    return this.http.post<Bem>(this.API, bem);
  }

  removerBem(idBem: number): Observable<any> {
    return this.http.delete<any>(this.API + '/' + idBem);
  }

  editarBem(bem: Bem): Observable<Bem> {
    return this.http.put<Bem>(this.API, bem);
  }

  buscarBensPorEstado(estadoBem: string): Observable<Bem[]> {
    return this.http.get<Bem[]>(this.API + '/estado/'+ estadoBem);
  }

  buscarBensPorLocal(idLocal: number): Observable<Bem[]> {
    return this.http.get<Bem[]>(this.API + '/local/' + idLocal);
  }

  buscarBemPorCodigo(idCodigo: string): Observable<Bem> {
    return this.http.get<Bem>(this.API + '/codigo/' + idCodigo);
  }
}
