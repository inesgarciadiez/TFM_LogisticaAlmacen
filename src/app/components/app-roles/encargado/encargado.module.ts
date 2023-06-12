import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncargadoRoutingModule } from './encargado-routing.module';
import { ListadosComponent } from './listados/listados.component';
import { ListadoPedidosComponent } from './listados/components/listado-pedidos/listado-pedidos.component';


@NgModule({
  declarations: [
    ListadosComponent,
    ListadoPedidosComponent
  ],
  imports: [
    CommonModule,
    EncargadoRoutingModule
  ]
})
export class EncargadoModule { }
