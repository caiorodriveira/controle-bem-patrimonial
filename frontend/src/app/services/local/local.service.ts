import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Local } from 'src/app/models/Local.model';
import { environment } from 'src/environment/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private readonly API = environment.apiUrl + '/local'
  constructor(private http: HttpClient) { }

  buscarTodosLocais(): Observable<Local[]>{
    return this.http.get<Local[]>(this.API, {headers: AuthService.setHeaders()});
  }

  salvarLocal(local: Local): Observable<Local> {
    return this.http.post<Local>(this.API, local, {headers: AuthService.setHeaders()});
  }

  editarLocal(local: Local): Observable<Local> {
    return this.http.put<Local>(this.API, local, {headers: AuthService.setHeaders()});
  }

  removerLocal(idLocal: number): Observable<any> {
    return this.http.delete<any>(this.API + '/' + idLocal, {headers: AuthService.setHeaders()});
  }

}
