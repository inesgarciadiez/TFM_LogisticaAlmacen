import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListadoService {

private baseUrl: string
  private loggedIn: boolean;
  
  private _logged: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = 'http://localhost:3000/api';
    this.loggedIn = localStorage.getItem('token_user') ? true : false;
    this._logged = new BehaviorSubject(this.loggedIn);
  }

  getAll() {
    const httpOptions = {
        headers: new HttpHeaders ({
            'Authorization': localStorage.getItem('token_user')!
        })
    }
    return firstValueFrom (
        this.httpClient.get<any>(`${this.baseUrl}/pedidos/operario`, httpOptions)
    )
  }
}

