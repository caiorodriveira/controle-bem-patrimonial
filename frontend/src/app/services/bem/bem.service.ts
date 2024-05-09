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

  buscarBens(): Observable<Bem[]>{
    return this.http.get<Bem[]>(this.API);
  }

  salvarBem(bem: Bem): Observable<Bem> {
    return this.http.post<Bem>(this.API, bem);
  }

}
