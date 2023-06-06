//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JefeRoutingModule } from './jefe-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
//Components
import { ListadosComponent } from './listados/listados.component';
import { ListadoUsuariosComponent } from './listados/components/listado-usuarios/listado-usuarios.component';
import { ModalEditarUsuarioComponent } from './listados/components/listado-usuarios/components/modal-editar-usuario/modal-editar-usuario.component';
import { ModalEliminarUsuarioComponent } from './listados/components/listado-usuarios/components/modal-eliminar-usuario/modal-eliminar-usuario.component';
import { ListadoAlmacenesComponent } from './listados/components/listado-almacenes/listado-almacenes.component';
import { ListadosService } from './services/listados.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListadoUsuariosComponent,
    ListadosComponent,
    ModalEditarUsuarioComponent,
    ModalEliminarUsuarioComponent,
    ListadoAlmacenesComponent,
  ],
  imports: [
    CommonModule,
    JefeRoutingModule,
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
export class JefeModule { }