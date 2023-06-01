import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl: string
  private loggedIn: boolean;

  private _logged: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = 'http://localhost:3000/api/usuarios';
    this.loggedIn = localStorage.getItem('token_user') ? true : false;
    this._logged = new BehaviorSubject(this.loggedIn);
  }

  get logged() {
    return this._logged.asObservable();
  }

  login(values: { email: string, password: string}) {
    return firstValueFrom (
      this.httpClient.post<any>(`${this.baseUrl}/login`, values)
    )
  }

  isLogged(): boolean {
    return localStorage.getItem('token_gym') ? true : false;
  }

  changeLogin(logged: boolean) {
    this._logged.next(logged);
  }

}
