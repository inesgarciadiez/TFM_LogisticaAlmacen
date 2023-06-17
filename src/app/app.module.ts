import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/theme/navbar/navbar.component';
import { FooterComponent } from './components/theme/footer/footer.component'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { JefeModule } from './components/app-roles/jefe/jefe.module';
import { HomeComponent } from './components/theme/home/home.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { OperarioModule } from './components/app-roles/operario/operario.module';
import { AuthInterceptor } from './shared/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    LoginComponent,

  ],
  exports:[

    ],
  imports: [
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule,
    JefeModule,
    BrowserModule,
    HttpClientModule,
    OperarioModule
  ],
  
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
