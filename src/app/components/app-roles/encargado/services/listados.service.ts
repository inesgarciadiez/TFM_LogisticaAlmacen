import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PedidosInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ListadosService {


  constructor( private clientHttp:HttpClient ) { }

  obtenerPedidos(): Observable<PedidosInterface[]>{
    const httpOptions = {
      headers: new HttpHeaders ({
          'Authorization': localStorage.getItem('token_user')!
      })
    }
    const url = `${environment.apiUrl}/pedidos/encargado`
    return this.clientHttp.get<PedidosInterface[]>(url, httpOptions);
  }

}
