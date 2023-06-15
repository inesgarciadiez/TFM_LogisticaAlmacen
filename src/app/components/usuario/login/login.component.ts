import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public formulario!: FormGroup;

  constructor(private usuariosService: UsuariosService, private fb: FormBuilder,
              private router: Router, public activeModal: NgbActiveModal) {
   
  }


  ngOnInit(): void {
   this.formulario = this.fb.group({
     email: [],
     password: []
   });    
  }

  async onSubmit() {
    const response = await this.usuariosService.login(this.formulario.value);

    if (response.fatal) {
      this.router.navigate(['home']);
      return alert(response.fatal);
    }

    localStorage.setItem('token_user', response.token);
    this.usuariosService.changeLogin(true);

    if (response.rol === 1)
    {
      this.router.navigate(['listados/listado-activos']);
    }
    else if (response.rol === 3)
    {
      this.router.navigate(['listados/listado-usuarios']);
    }
    else if (response.rol === 2)
    {
      this.router.navigate(['listados/listado-pedidos']);
    }
    this.activeModal.close(true)
  }
}
