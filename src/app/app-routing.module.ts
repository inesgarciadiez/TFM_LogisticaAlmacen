import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/usuario/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'jefe', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { 
    path:"jefe",
    loadChildren: ()=> import("./components/app-roles/jefe/jefe.module").then((m)=> m.JefeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
