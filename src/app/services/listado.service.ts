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
  public getData(){

/*     return [
        {
            "id": "1",
            "name": "Brendan",
            "phone": "1-724-406-2487",
            "company": "ZEnim Commodo Limited Enim Commodo Limited Enim Commodo LimitedEnim Commodo Limited",
            "zip": "98611",
            "city": "Norman",
            "date": "02/13/14",
            "country": "Bangladesh"
        },
        {
            "id": "2",
            "name": "Warren",
            "phone": "1-412-485-9725",
            "company": "ZOdio Etiam Institute",
            "zip": "10312",
            "city": "Sautin",
            "date": "01/01/13",
            "country": "India"
        },
        {
            "id": "3",
            "name": "qwBrendan",
            "phone": "1-724-406-2487",
            "company": "YEnim Commodo Limited",
            "zip": "98611",
            "city": "Norman",
            "date": "02/13/14",
            "country": "Bangladesh"
        },
        {
            "id": "4",
            "name": "rarren",
            "phone": "1-412-485-9725",
            "company": "Odio Etiam Institute",
            "zip": "10312",
            "city": "Sautin",
            "date": "01/01/13",
            "country": "India"
        },
        {
            "id": "5",
            "name": "dssendan",
            "phone": "1-724-406-2487",
            "company": "Enim Commodo Limited",
            "zip": "98611",
            "city": "Norman",
            "date": "02/13/14",
            "country": "Bangladesh"
        },
        {
            "id": "6",
            "name": "Warren",
            "phone": "1-412-485-9725",
            "company": "Odio Etiam Institute",
            "zip": "10312",
            "city": "Sautin",
            "date": "01/01/13",
            "country": "India"
        },
        {
            "id": "7",
            "name": "Brendan",
            "phone": "1-724-406-2487",
            "company": "Enim Commodo Limited",
            "zip": "98611",
            "city": "Norman",
            "date": "02/13/14",
            "country": "Bangladesh"
        },
        {
            "id": "8",
            "name": "Warren",
            "phone": "1-412-485-9725",
            "company": "Odio Etiam Institute",
            "zip": "10312",
            "city": "Sautin",
            "date": "01/01/13",
            "country": "India"
        },
        {
            "id": "9",
            "name": "Brendan",
            "phone": "1-724-406-2487",
            "company": "Enim Commodo Limited",
            "zip": "98611",
            "city": "Norman",
            "date": "02/13/14",
            "country": "Bangladesh"
        },
        {
            "id": "10",
            "name": "Warren",
            "phone": "1-412-485-9725",
            "company": "Odio Etiam Institute",
            "zip": "10312",
            "city": "Sautin",
            "date": "01/01/13",
            "country": "India"
        },
        {
            "id": "11",
            "name": "Brendan",
            "phone": "1-724-406-2487",
            "company": "Enim Commodo Limited",
            "zip": "98611",
            "city": "Norman",
            "date": "02/13/14",
            "country": "Bangladesh"
        },
        {
            "id": "12",
            "name": "Warren",
            "phone": "1-412-485-9725",
            "company": "Odio Etiam Institute",
            "zip": "10312",
            "city": "Sautin",
            "date": "01/01/13",
            "country": "India"
        },
        {
            "id": "13",
            "name": "Brendan",
            "phone": "1-724-406-2487",
            "company": "Enim Commodo Limited",
            "zip": "98611",
            "city": "Norman",
            "date": "02/13/14",
            "country": "Bangladesh"
        },
        {
            "id": "14",
            "name": "Warren",
            "phone": "1-412-485-9725",
            "company": "Odio Etiam Institute",
            "zip": "10312",
            "city": "Sautin",
            "date": "01/01/13",
            "country": "India"
        },
        {
            "id": "15",
            "name": "Brendan",
            "phone": "1-724-406-2487",
            "company": "Enim Commodo Limited",
            "zip": "98611",
            "city": "Norman",
            "date": "02/13/14",
            "country": "Bangladesh"
        },
        {
            "id": "16",
            "name": "Warren",
            "phone": "1-412-485-9725",
            "company": "Odio Etiam Institute",
            "zip": "10312",
            "city": "Sautin",
            "date": "01/01/13",
            "country": "India"
        },
        {
            "id": "17",
            "name": "Brendan",
            "phone": "1-724-406-2487",
            "company": "Enim Commodo Limited",
            "zip": "98611",
            "city": "Norman",
            "date": "02/13/14",
            "country": "Bangladesh"
        },
        {
            "id": "18",
            "name": "Warren",
            "phone": "1-412-485-9725",
            "company": "Odio Etiam Institute",
            "zip": "10312",
            "city": "Sautin",
            "date": "01/01/13",
            "country": "India"
        },
        {
            "id": "19",
            "name": "Brendan",
            "phone": "1-724-406-2487",
            "company": "Enim Commodo Limited",
            "zip": "98611",
            "city": "Norman",
            "date": "02/13/14",
            "country": "Bangladesh"
        },
        {
            "id": "20",
            "name": "Warren",
            "phone": "1-412-485-9725",
            "company": "Odio Etiam Institute",
            "zip": "10312",
            "city": "Sautin",
            "date": "01/01/13",
            "country": "India"
        },
        {
            "id": "21",
            "name": "Brendan",
            "phone": "1-724-406-2487",
            "company": "Enim Commodo Limited",
            "zip": "98611",
            "city": "Norman",
            "date": "02/13/14",
            "country": "Bangladesh"
        },
        {
            "id": "22",
            "name": "Warren",
            "phone": "1-412-485-9725",
            "company": "Odio Etiam Institute",
            "zip": "10312",
            "city": "Sautin",
            "date": "01/01/13",
            "country": "India"
        },
        {
            "id": "23",
            "name": "Brendan",
            "phone": "1-724-406-2487",
            "company": "Enim Commodo Limited",
            "zip": "98611",
            "city": "Norman",
            "date": "02/13/14",
            "country": "Bangladesh"
        },
        {
            "id": "24",
            "name": "Warren",
            "phone": "1-412-485-9725",
            "company": "Odio Etiam Institute",
            "zip": "10312",
            "city": "Sautin",
            "date": "01/01/13",
            "country": "India"
        },
        {
            "id": "25",
            "name": "Brendan",
            "phone": "1-724-406-2487",
            "company": "ZEnim Commodo Limited Enim Commodo Limited Enim Commodo LimitedEnim Commodo Limited",
            "zip": "98611",
            "city": "Norman",
            "date": "02/13/14",
            "country": "Bangladesh"
        }
    ]; */
  }
}
