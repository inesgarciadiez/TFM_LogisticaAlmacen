import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../../jefe/interfaces';
import { environment } from 'src/environments/environment';

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
    const url = `${environment.apiUrl}/pedidos`
    return this.clientHttp.get<Users[]>(url, httpOptions);
  }

}
