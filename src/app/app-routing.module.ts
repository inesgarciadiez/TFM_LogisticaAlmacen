import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/usuario/login/login.component';
import { ListaPedidosComponent } from "./components/usuario/operario/lista-pedidos/lista-pedidos.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'usuario/operario/pedidos', component: ListaPedidosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
