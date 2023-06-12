import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoPedidosComponent } from './listados/components/listado-pedidos/listado-pedidos.component';
import { ListadosComponent } from './listados/listados.component';

const routes: Routes = [
  {path:"", redirectTo: "listados/listado-pedidos", pathMatch: "full"},
  {path:"listados", component:ListadosComponent, children:[
    {path: 'listado-pedidos', component:ListadoPedidosComponent},
  ]},
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncargadoRoutingModule { }
