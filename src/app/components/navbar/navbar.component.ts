import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  estaHome(): boolean{
    return this.router.url === '/home';
  }
  estaLogin(): boolean{
    return this.router.url === '/login';
  }

}
