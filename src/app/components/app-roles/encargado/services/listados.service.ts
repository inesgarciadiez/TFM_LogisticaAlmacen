import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListadoActivos } from '../../operario/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ListadosEncargadoService {


  constructor( private clientHttp:HttpClient ) { }

  obtenerPedidos(): Observable<ListadoActivos[]>{
    const url = `${environment.apiUrl}/pedidos/encargado`
    return this.clientHttp.get<ListadoActivos[]>(url);
  }

  aprobarPedido(idPedido:number|undefined): Observable<ListadoActivos> {
    const url = `${environment.apiUrl}/pedidos/encargado/aprobar/${idPedido}`;
    return this.clientHttp.put<ListadoActivos>(url,null);
  }
  rechazarPedido(idPedido: number | undefined, comentario: string) :Observable<any>{
    const url = `${environment.apiUrl}/pedidos/encargado/denegar/${idPedido}`;
    return this.clientHttp.put<ListadoActivos>(url,comentario);
  }

}
