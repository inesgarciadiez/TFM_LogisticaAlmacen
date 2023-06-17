//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JefeRoutingModule } from './jefe-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';


//Components
import { ListadosJefeComponent } from './listados/listados.component';
import { ListadoUsuariosComponent } from './listados/components/listado-usuarios/listado-usuarios.component';
import { ModalEditarUsuarioComponent } from './listados/components/listado-usuarios/components/modal-editar-usuario/modal-editar-usuario.component';
import { ListadoAlmacenesComponent } from './listados/components/listado-almacenes/listado-almacenes.component';
import { ListadosService } from './services/listados.service';
import { ModalEditarAlmacenComponent } from './listados/components/listado-almacenes/components/modal-editar-almacen/modal-editar-almacen.component';



@NgModule({
  declarations: [
    ListadoUsuariosComponent,
    ListadosJefeComponent,
    ModalEditarUsuarioComponent,
    ListadoAlmacenesComponent,
    ModalEditarAlmacenComponent,
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
    ListadosService,
  ]
})
export class JefeModule { }
