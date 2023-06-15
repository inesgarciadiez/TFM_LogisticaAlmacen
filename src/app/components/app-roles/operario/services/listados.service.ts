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

    const url = `${environment.apiUrl}/pedidos/operario`
    return this.clientHttp.get<ListadoActivos[]>(url);
  }

  getById(pId: string) {
    const httpOptions = {
      headers: new HttpHeaders ({
          'Authorization': localStorage.getItem('token_user')!
      })
    }
    const url = `${environment.apiUrl}/pedidos/${pId}`;
    return this.clientHttp.get<ListadoActivos[]>(url, httpOptions);
  }
}

  addPedido(newOrder:ListadoActivos) {
    console.log(newOrder)
    const httpOptions = {
      headers: new HttpHeaders ({
          'Authorization': localStorage.getItem('token_user')!
      })
    }
    const url = `${environment.apiUrl}/pedidos`;
    return this.clientHttp.post<ListadoActivos[]>(url, newOrder, httpOptions);
  }

  editPedido(newOrder:ListadoActivos, idPedido:number|undefined) {
    console.log("Aquiiiii" + newOrder + " " + idPedido)
    const url = `${environment.apiUrl}/pedidos/${idPedido}`;
    console.log(url);
    return this.clientHttp.put<ListadoActivos[]>(url, newOrder);
  }

  eliminarPedido(pedidoId: number) {
    const url = `${environment.apiUrl}/pedidos/${pedidoId}`;
    console.log(url);
    return this.clientHttp.delete<ListadoActivos[]>(url);
  }
}
