import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from 'src/app/interfaces';
import { Almacenes } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ListadosService {


  constructor( private clientHttp:HttpClient ) { }

  obtenerUsuarios(): Observable<Users[]>{
    const url = `${environment.apiUrl}/usuarios`
    return this.clientHttp.get<Users[]>(url);
  }

  addUsuario(usuario:Users): Observable<Users>{
    const url = `${environment.apiUrl}/usuarios`
    return this.clientHttp.post<Users>(url, usuario);
  }

  editarUsuario(usuario:Users, idUser:number|undefined): Observable<Users>{
    const url = `${environment.apiUrl}/usuarios/${idUser}`
    return this.clientHttp.put<Users>(url, usuario);
  }

  usuarioByID(id: number):Observable<Users>{
    const url = `${environment.apiUrl}/usuarios/${id}`
    return this.clientHttp.get<Users>(url)
  }

  obtenerAlmacenes(): Observable<Almacenes[]>{
    const url = `${environment.apiUrl}/almacenes`
    return this.clientHttp.get<Almacenes[]>(url);
  }

  addAlmacen(almacen:Almacenes){
    const url = `${environment.apiUrl}/almacenes`
    return this.clientHttp.post<Almacenes>(url,almacen);
  }

  editarAlmacen(almacen: Almacenes, idAlmacen:number|undefined): Observable<Almacenes>{
    const url = `${environment.apiUrl}/almacenes/${idAlmacen}`
    return this.clientHttp.put<Almacenes>(url,almacen);
  }





}
