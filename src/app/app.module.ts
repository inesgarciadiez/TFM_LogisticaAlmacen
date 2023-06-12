import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { JefeModule } from './components/app-roles/jefe/jefe.module';
import { HomeComponent } from './components/theme/home/home.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { OperarioModule } from './components/app-roles/operario/operario.module';
import { EncargadoModule } from './components/app-roles/encargado.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    LoginComponent
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
    OperarioModule,
    EncargadoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
