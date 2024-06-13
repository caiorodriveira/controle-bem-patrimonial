import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario } from 'src/app/models/Inventario.model';
import { environment } from 'src/environment/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private readonly API = environment.apiUrl + '/inventario'
  constructor(private http: HttpClient) { }

  buscarTodosInventarios(): Observable<Inventario[]>{
    return this.http.get<Inventario[]>(this.API, {headers: AuthService.setHeaders()});
  }

  salvarInventario(inventario: Inventario): Observable<Inventario> {
    return this.http.post<Inventario>(this.API, inventario, {headers: AuthService.setHeaders()});
  }

  editarInventatio(inventario: Inventario): Observable<Inventario> {
    return this.http.put<Inventario>(this.API, inventario, {headers: AuthService.setHeaders()});
  }

  removerInventario(idInventario: number): Observable<any> {
    return this.http.delete<any>(this.API + '/' + idInventario, {headers: AuthService.setHeaders()});
  }
}
