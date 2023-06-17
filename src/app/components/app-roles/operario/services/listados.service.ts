import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListadoActivos } from '../interfaces';
import { Almacenes } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ListadosService {

  constructor( private clientHttp:HttpClient ) { }

  obtenerPedidos(): Observable<ListadoActivos[]>{

    const url = `${environment.apiUrl}/pedidos/operario`
    return this.clientHttp.get<ListadoActivos[]>(url);
  }
  addPedidos(pedido:ListadoActivos): Observable<ListadoActivos>{
    const url = `${environment.apiUrl}/pedidos`
    return this.clientHttp.post<ListadoActivos>(url, pedido);
  }
  obtenerAlmacenes(): Observable<Almacenes[]>{
    const url = `${environment.apiUrl}/almacenes`
    return this.clientHttp.get<Almacenes[]>(url);
  }

}
