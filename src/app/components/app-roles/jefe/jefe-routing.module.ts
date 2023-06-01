import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoUsuariosComponent } from './listados/components/listado-usuarios/listado-usuarios.component';
import { ListadosComponent } from './listados/listados.component';
import { ListadoAlmacenesComponent } from './listados/components/listado-almacenes/listado-almacenes.component';

const routes: Routes = [
  {path:"", redirectTo: "listados/listado-usuarios", pathMatch: "full"},
  {path:"listados", component:ListadosComponent, children:[
    {path: 'listado-usuarios', component:ListadoUsuariosComponent},
    {path: 'listado-almacenes', component:ListadoAlmacenesComponent},
  ]},
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JefeRoutingModule { }
 