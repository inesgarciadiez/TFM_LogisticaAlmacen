import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoActivosComponent } from './listados/components/listado-activos/listado-activos.component';
import { ListadosComponent } from './listados/listados.component';
import { ListadoPasadosComponent } from './listados/components/listado-pasados/listado-pasados.component';

const routes: Routes = [
  {path:"", redirectTo: "listados/listado-pedidos", pathMatch: "full"},
  {path:"listados", component:ListadosComponent, children:[
    {path: 'listado-activos', component:ListadoActivosComponent},
    {path: 'listado-pasados', component:ListadoPasadosComponent},
  ]},
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperarioRoutingModule { }