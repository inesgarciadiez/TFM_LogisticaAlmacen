import { Component,OnInit,OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Users, UsersMostrar, Almacenes } from '../../../interfaces'; 
import { ModalEditarUsuarioComponent } from './components/modal-editar-usuario/modal-editar-usuario.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime, fromEvent, map } from 'rxjs';
import { ModalEliminarUsuarioComponent } from './components/modal-eliminar-usuario/modal-eliminar-usuario.component';
import { ListadosService } from '../../../services/listados.service';
import { Roles } from 'src/app/shared/rol-enum';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit, OnDestroy,AfterViewInit {
  @ViewChild ("search", {static: false}) search: any
  public rows: Array<object> = []; 
  public columns: Array<object> = [];
  public temp: Array<object> = [];
  public usuarios: Users[] = [];
  public dataUserMostrar: UsersMostrar[] = [];
  public rol! : Roles
  private destroyed$ = new Subject<void>()
  

  // public dataPrueba: Users[] = [ 
  //  { nombre: "Pedro  ", apellidos:"Martinez Garcia ",  rol: "Operario" , email: "pedro@correo.com", contrasena: "pedrito",    },
  //  { nombre: "Juan   ", apellidos:"Martinez Garcia ",   rol: "Encargado",email: "juan@correo.com", contrasena: "pedrito", almacen: {direccion: 'Calle Ejemplo 123', ciudad: 'Madrid', c_postal: 28001, nombre: 'Almacen 1'} },
  //  { nombre: "Carlo  ", apellidos:"Martinez Garcia ",  rol: "Operario" , email: "carlo@correo.com", contrasena: "pedrito",    },
  //  { nombre: "David  ", apellidos:"Martinez Garcia ",  rol: "Encargado", email: "david@correo.com", contrasena: "pedrito", almacen: {direccion: 'Avenida Principal 456', ciudad: 'Barcelona', c_postal: 18002, nombre: 'Almacen 2'} },
  //  { nombre: "Daniel ", apellidos:"Martinez Garcia ",  rol: "Operario",  email: "daniel@correo.com", contrasena: "pedrito",  },
  //  { nombre: "Miguel ", apellidos:"Martinez Garcia ",  rol: "Encargado", email: "miguel@correo.com", contrasena: "pedrito", almacen: {direccion: 'Calle Principal 789', ciudad: 'Valencia', c_postal: 46001, nombre: 'Almacen 3'} },
  //  { nombre: "Manuel ", apellidos:"Martinez Garcia ",  rol: "Operario",  email: "manuel@correo.com", contrasena: "pedrito",  },
  // ]

  public dataAlmacenes: Almacenes[] = [ 
    { direccion: 'Calle Ejemplo 123', ciudad: 'Madrid', c_postal: 28001, nombre: 'Almacen 1' },
    { direccion: 'Avenida Principal 456', ciudad: 'Barcelona', c_postal: 18002, nombre: 'Almacen 2' },
    { direccion: 'Calle Principal 789', ciudad: 'Valencia', c_postal: 46001, nombre: 'Almacen 3'}
  ]

  constructor(private modalService: NgbModal, private listadosService: ListadosService){}

  ngOnInit() {
this.listadosService.obtenerUsuarios().subscribe( usuarios => {
  this.dataUserMostrar = usuarios.map((u)=>{
    const usuario: UsersMostrar = {
      contraseña: u.contraseña,
      email: u.email,
      nombre: u.nombre + " " + u.apellido,
      rol: Roles[u.rol_id],
    }
    return usuario
  }) 
  this.temp = this.dataUserMostrar;
  this.rows = [...this.temp]
  console.log(usuarios)
})
      this.columns = [
        { prop: "nombre", name: "Nombre" },
        { prop: "rol", name: "Rol" },
        { prop: "email", name: "Correo" },
        { prop: "contraseña", name: "Contraseña" },
        
      ]
  }
  editarUsuario(usuario: Users){

    const modalRef = this.modalService.open(ModalEditarUsuarioComponent, { centered: true, size: 'lg'});
    modalRef.componentInstance.usuario = usuario
    modalRef.componentInstance.almacenes = this.dataAlmacenes
    modalRef.result.then((result) => {
      if(result){
        console.log("edito")
      }
    });
  }
  crearUsuario(){
    const modalRef = this.modalService.open(ModalEditarUsuarioComponent, { centered: true, size: 'lg'});
    modalRef.componentInstance.almacenes = this.dataAlmacenes
    modalRef.result.then((result) => {
      if(result){
        console.log("creo")
      }
    });
  }
    eliminarUsuario(usuario: Users){
      const modalRef = this.modalService.open(ModalEliminarUsuarioComponent, { centered: true});
    modalRef.result.then((result) => {
      if(result){
        console.log("elimino")
      }
    });
    }

    ngAfterViewInit(): void {
      fromEvent(this.search.nativeElement, 'keydown')
        .pipe(
          debounceTime(550),
          map((x:any) => x['target']['value'])
        )
        .subscribe((value) => {
          this.updateFilter(value);
        });
    }
    
    updateFilter(val: any) {
      const value = val.toString().toLowerCase().trim();
        const count = this.columns.length;
        const keys = Object.keys(this.temp[0]);
        this.rows = this.temp.filter((item:any) => {
          let shouldFilter = false;
           for (let i = 0; i <= count; i++) {
             if (
               (item[keys[i]] &&
                 item[keys[i]]
                   .toString()
                   .toLowerCase()
                   .indexOf(value) !== -1) ||
               !value
             ) {
              shouldFilter = true
             }
           }
           return shouldFilter
        });
    }

   ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
   }

}
