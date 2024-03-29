import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/usuario/login/login.component';
import { HomeComponent } from './components/theme/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { 
    path:"jefe",
    loadChildren: ()=> import("./components/app-roles/jefe/jefe.module").then((m)=> m.JefeModule)
  },
  { 
    path:"operario",
    loadChildren: ()=> import("./components/app-roles/operario/operario.module").then((m)=> m.OperarioModule)
  },
  {
    path:"encargado",
    loadChildren: ()=> import("./components/app-roles/encargado/encargado.module").then((m) => m.EncargadoModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
