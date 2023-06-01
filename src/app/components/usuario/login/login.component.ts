import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;

  constructor(private usuariosService: UsuariosService,
              private router: Router) {
    this.formulario = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  async onSubmit() {
    const response = await this.usuariosService.login(this.formulario.value);

    if (response.fatal) {
      return alert(response.fatal);
    }

    localStorage.setItem('token_user', response.token);
    this.usuariosService.changeLogin(true);
    //this.router.navigate(['/']);
  }
}
