import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl: string

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = 'http://localhost:3000/api/usuarios'
  }

  login(values: { email: string, password: string}) {
    return firstValueFrom (
      this.httpClient.post<any>(`${this.baseUrl}/login`, values)
    )
  }

}
