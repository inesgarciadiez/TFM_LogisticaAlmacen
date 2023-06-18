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


  getById(pId: string) {
    const url = `${environment.apiUrl}/pedidos/${pId}`;
    return this.clientHttp.get<ListadoActivos[]>(url);
  }
  
  editPedido(pedido:ListadoActivos, idPedido:number|undefined): Observable<ListadoActivos> {
    const url = `${environment.apiUrl}/pedidos/13`;
    return this.clientHttp.put<ListadoActivos>(url, pedido);
  }
  envioRevision(idPedido:number|undefined): Observable<ListadoActivos> {
    const url = `${environment.apiUrl}/pedidos/operario/enviorevision/${idPedido}`;
    return this.clientHttp.put<ListadoActivos>(url,null);
  }

  eliminarPedido(pedidoId: number| undefined) {
    const url = `${environment.apiUrl}/pedidos/${pedidoId}`;
    console.log(url);
    return this.clientHttp.delete<ListadoActivos[]>(url);
  }
}
