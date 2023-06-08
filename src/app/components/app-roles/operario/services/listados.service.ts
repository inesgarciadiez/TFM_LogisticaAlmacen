import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListadoActivos } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ListadosService {

  constructor( private clientHttp:HttpClient ) { }

  obtenerPedidos(): Observable<ListadoActivos[]>{
    const httpOptions = {
      headers: new HttpHeaders ({
          'Authorization': localStorage.getItem('token_user')!
      })
    }
    const url = `${environment.apiUrl}/pedidos/operario`
    return this.clientHttp.get<ListadoActivos[]>(url, httpOptions);
  }
}
