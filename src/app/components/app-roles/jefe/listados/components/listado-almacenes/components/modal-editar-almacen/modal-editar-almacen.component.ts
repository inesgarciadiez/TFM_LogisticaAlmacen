import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ListadosService } from 'src/app/components/app-roles/jefe/services/listados.service';
import { Almacenes, AlmacenesMostrar, Users, UsersMostrar } from 'src/app/interfaces';

@Component({
  selector: 'app-modal-editar-almacen',
  templateUrl: './modal-editar-almacen.component.html',
  styleUrls: ['./modal-editar-almacen.component.css']
})
export class ModalEditarAlmacenComponent {
  private destroyed$ = new Subject<void>()
  @Input() almacen!: AlmacenesMostrar
  public form!: FormGroup
  public usuarios: UsersMostrar[] =[]
  public nombreCompleto = ""

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal , private listadosService: ListadosService){}

  ngOnInit(): void {
    console.log(this.almacen)
    if(this.almacen != undefined){
      this.form = this.fb.group({
        nombre: [this.almacen.nombre],
        direccion: [this.almacen.direccion],
        codigo_postal: [this.almacen.codigo_postal],
        ciudad: [this.almacen.ciudad],
        responsable: [this.almacen.name_responsable],
      })
    }else{
      this.form = this.fb.group({
        nombre: [null],
        direccion: [null],
        codigo_postal: [null],
        ciudad: [null],
        responsable: [null],
      })
    }
    
    this.listadosService.obtenerUsuarios().subscribe(users => {
      this.usuarios = users.map((u)=>{
        const usuario: UsersMostrar = {
          contraseña: u.nombre + "1234",
          email: u.email,
          nombre: u.nombre + " " + u.apellido,
          rol: u.rol,
          id: u.id
        }
        return usuario
      }) 
    })
  }

  onSubmit(){
       const almacenEdit: Almacenes = {
         nombre: this.form.value.nombre,
         direccion: this.form.value.direccion,
         codigo_postal: this.form.value.codigo_postal,
         ciudad: this.form.value.ciudad,
         responsable_id: this.form.value.responsable['id'] != undefined? this.form.value.responsable['id']: this.almacen.id_responsable,
       }
     console.log(almacenEdit)
     if(this.almacen!= undefined){
        this.listadosService.editarAlmacen(almacenEdit,this.almacen.id).subscribe(resp =>{
          console.log(resp)
         })
     }else{
       this.listadosService.addAlmacen(almacenEdit).subscribe(resp =>{
        console.log(resp)
       })
     }
     this.activeModal.close(true)
  }


  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
   }

}
