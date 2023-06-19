import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

import { EncargadoRoutingModule } from './encargado-routing.module';
import { ListadosComponent } from './listados/listados.component';
import { ListadoPedidosComponent } from './listados/components/listado-pedidos/listado-pedidos.component';
import { ListadosEncargadoService } from '../encargado/services/listados.service';
import { HttpClientModule } from '@angular/common/http';
import { ListadoCerradosComponent } from './listados/components/listado-cerrados/listado-cerrados.component';


@NgModule({
  declarations: [
    ListadosComponent,
    ListadoPedidosComponent,
    ListadoCerradosComponent
  ],
  imports: [
    CommonModule,
    EncargadoRoutingModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule
  ],
  providers:[
    ListadosEncargadoService
  ],
})
export class EncargadoModule { }
