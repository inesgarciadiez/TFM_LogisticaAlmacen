import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/theme/navbar/navbar.component';
import { FooterComponent } from './components/theme/footer/footer.component'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { JefeModule } from './components/app-roles/jefe/jefe.module';
import { HomeComponent } from './components/theme/home/home.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { OperarioModule } from './components/app-roles/operario/operario.module';
import { EncargadoModule } from './components/app-roles/encargado/encargado.module';
import { AuthInterceptor } from './shared/auth.interceptor';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { AgmDirectionModule } from 'agm-direction';
import { NgSelectModule } from '@ng-select/ng-select'; 


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule,
    JefeModule,
    OperarioModule,
    EncargadoModule,
    AgmCoreModule.forRoot(environment.googleMaps),
    AgmDirectionModule,
    NgSelectModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }
