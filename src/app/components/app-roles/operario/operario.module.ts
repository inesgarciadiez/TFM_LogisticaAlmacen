//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperarioRoutingModule } from './operario-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
//Components
import { ListadosComponent } from './listados/listados.component';
/* import { ModalEditarUsuarioComponent } from './listados/components/listado-usuarios/components/modal-editar-usuario/modal-editar-usuario.component';
import { ModalEliminarUsuarioComponent } from './listados/components/listado-usuarios/components/modal-eliminar-usuario/modal-eliminar-usuario.component'; */
import { ListadosService } from './services/listados.service';
import { HttpClientModule } from '@angular/common/http';
import { ListadoActivosComponent } from './listados/components/listado-activos/listado-activos.component';
import { ListadoPasadosComponent } from './listados/components/listado-pasados/listado-pasados.component';
import { ModalAltaPedidoComponent } from './listados/components/listado-activos/components/modal-alta-pedido/modal-alta-pedido.component';


@NgModule({
  declarations: [
    ListadoActivosComponent,
    ListadosComponent,
/*     ModalEditarUsuarioComponent,
    ModalEliminarUsuarioComponent, */
    ListadoPasadosComponent,
ModalAltaPedidoComponent
  ],
  imports: [
    CommonModule,
    OperarioRoutingModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule
  ],
  providers:[
    ListadosService
  ]
})
export class OperarioModule { }
