import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListadoPasados } from '../interfaces/listado-pasados.interface';

@Injectable({
  providedIn: 'root'
})
export class ListadosService {

  constructor( private clientHttp:HttpClient ) { }

  obtenerUsuarios(): Observable<ListadoPasados[]>{
    console.log()
    const url = `${environment.apiUrl}/usuarios`
    return this.clientHttp.get<ListadoPasados[]>(url);
  }
}
