//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperarioRoutingModule } from './operario-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { ListadosOperarioComponent } from './listados/listados.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ListadoActivosComponent } from './listados/components/listado-activos/listado-activos.component';
import { ListadoPasadosComponent } from './listados/components/listado-pasados/listado-pasados.component';
import { ModalAltaPedidoComponent } from './listados/components/listado-activos/components/modal-alta-pedido/modal-alta-pedido.component';
import { AuthInterceptor } from 'src/app/shared/auth.interceptor';
import { ListadosService } from './services/listados.service';
import { ModalEliminarPedidoComponent } from './listados/components/listado-activos/components/modal-eliminar-pedido/modal-eliminar-pedido.component';


@NgModule({
  declarations: [
    ListadoActivosComponent,
    ListadosOperarioComponent,
    ListadoPasadosComponent,
    ModalAltaPedidoComponent,
    ModalEliminarPedidoComponent,
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
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers:[
    ListadosService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ]
})
export class OperarioModule { }
