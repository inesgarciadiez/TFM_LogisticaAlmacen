import { Component,OnInit,OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Users, UsersMostrar, Almacenes } from 'src/app/interfaces'; 
import { ModalEditarUsuarioComponent } from './components/modal-editar-usuario/modal-editar-usuario.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime, fromEvent, map } from 'rxjs';
import { ListadosService } from '../../../services/listados.service';
import { Roles } from 'src/app/shared/rol-enum';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("search", { static: false }) search: any
  public rows: Array<object> = [];
  public columns: Array<object> = [];
  public temp: Array<object> = [];
  public usuarios: Users[] = [];
  public dataUserMostrar: UsersMostrar[] = [];
  public rol!: Roles
  private destroyed$ = new Subject<void>()
  
  constructor(private modalService: NgbModal, private listadosService: ListadosService) { }

  ngOnInit() {
    this.getUsers()
      this.columns = [
        { prop: "nombre", name: "Nombre" },
        { prop: "rol", name: "Rol" },
        { prop: "email", name: "Correo" },
        { prop: "contraseña", name: "Contraseña" },
      ]
  }

  getUsers(){
    this.listadosService.obtenerUsuarios().subscribe( usuarios => {
      this.dataUserMostrar = usuarios.map((u)=>{
        const usuario: UsersMostrar = {
          contraseña: u.nombre + "1234",
          email: u.email,
          nombre: u.nombre + " " + u.apellido,
          rol: u.rol.charAt(0).toUpperCase() +  u.rol.slice(1),
          id: u.id
        }
        return usuario
      }) 
      this.temp = this.dataUserMostrar;
      this.rows = [...this.temp]
})
  }

  editarUsuario(usuario: Users){
    const modalRef = this.modalService.open(ModalEditarUsuarioComponent, { centered: true, size: 'lg'});
    modalRef.componentInstance.usuario = usuario
    modalRef.result.then((result) => {
      if(result){
        this.getUsers()
      }
    });
  }
  crearUsuario(){
    const modalRef = this.modalService.open(ModalEditarUsuarioComponent, { centered: true, size: 'lg'});
 
    modalRef.result.then((result) => {
      if(result){
        this.getUsers()
      }
    });
  }
  eliminarUsuario(usuario: Users) {

  }

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map((x: any) => x['target']['value'])
      )
      .subscribe((value) => {
        this.updateFilter(value);
      });
  }

  updateFilter(val: any) {
    const value = val.toString().toLowerCase().trim();
    const count = this.columns.length;
    const keys = Object.keys(this.temp[0]);
    this.rows = this.temp.filter((item: any) => {
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
