import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../usuario/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router,private modalService: NgbModal) {}
  estaHome(): boolean{
    return this.router.url === '/home';
  }
  estaLogin(): boolean{
    return this.router.url === '/login';
  }
 
  abrirLogin(){
    const modalRef = this.modalService.open(LoginComponent, { centered: true, size: 'lg'});
    modalRef.result.then((result) => {
      if(result){
        console.log("creo")
      }
    });
  }


}


