import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario } from 'src/app/models/Inventario.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private readonly API = environment.apiUrl + '/inventario'
  constructor(private http: HttpClient) { }

  buscarTodosInventarios(): Observable<Inventario[]>{
    return this.http.get<Inventario[]>(this.API);
  }

  salvarInventario(inventario: Inventario): Observable<Inventario> {
    return this.http.post<Inventario>(this.API, inventario);
  }

  editarInventatio(inventario: Inventario): Observable<Inventario> {
    return this.http.put<Inventario>(this.API, inventario);
  }

  removerInventario(idInventario: number): Observable<any> {
    return this.http.delete<any>(this.API + '/' + idInventario);
  }
}
