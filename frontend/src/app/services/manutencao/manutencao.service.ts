import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manutencao } from 'src/app/models/Manutencao.model';
import { environment } from 'src/environment/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {

  private readonly API = environment.apiUrl + '/manutencao'
  constructor(private http: HttpClient) { }

  buscarTodasManutencoes(): Observable<Manutencao[]>{
    return this.http.get<Manutencao[]>(this.API, {headers: AuthService.setHeaders()});
  }

  salvarManutencao(manutencao: Manutencao): Observable<Manutencao> {
    return this.http.post<Manutencao>(this.API, manutencao, {headers: AuthService.setHeaders()});
  }

  editarManutencao(manutencao: Manutencao): Observable<Manutencao> {
    return this.http.put<Manutencao>(this.API, manutencao, {headers: AuthService.setHeaders()});
  }

  removerManutencao(idManutencao: number): Observable<any> {
    return this.http.delete<any>(this.API + '/' + idManutencao, {headers: AuthService.setHeaders()});
  }
}
