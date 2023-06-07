import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class ListadosService {


  constructor( private clientHttp:HttpClient ) { }

  obtenerUsuarios(): Observable<Users[]>{
    const httpOptions = {
      headers: new HttpHeaders ({
          'Authorization': localStorage.getItem('token_user')!
      })
  }
    const url = `${environment.apiUrl}/usuarios`
    return this.clientHttp.get<Users[]>(url, httpOptions);
  }

}
