import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ListadosService } from 'src/app/components/app-roles/jefe/services/listados.service';
import { Almacenes, AlmacenesMostrar, Users, UsersMostrar } from 'src/app/interfaces';
import Swal from 'sweetalert2';
import { ControlPosition, FullscreenControlOptions, MapTypeControlOptions, Marker, MouseEvent, StreetViewControlOptions } from "@agm/core";


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
    if(this.almacen != undefined ){
      this.form = this.fb.group({
        nombre: [this.almacen.nombre, [Validators.required, Validators.minLength(3)]],
        direccion: [this.almacen.direccion, [Validators.required]],
        codigo_postal: [this.almacen.codigo_postal, [Validators.required, Validators.minLength(5)]],
        ciudad: [this.almacen.ciudad, [Validators.required, Validators.minLength(3)]],
        responsable: [this.almacen.name_responsable],
      });
    } else {
      this.form = this.fb.group({
        nombre: [null, [Validators.required, Validators.minLength(3)]],
        direccion: [null, [Validators.required]],
        codigo_postal: [null, [Validators.required, Validators.minLength(5)]],
        ciudad: [null, [Validators.required, Validators.minLength(3)]],
        responsable: [null],
      });
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
     if(this.almacen!= undefined){
        this.listadosService.editarAlmacen(almacenEdit,this.almacen.id).subscribe(
          (resp) => {
            Swal.fire({
              icon: 'success',
              text: `El almacen se ha editado correctamente`,
            })
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error.mensaje,
            })
          }
        )
     }else{
       this.listadosService.addAlmacen(almacenEdit).subscribe(
        (resp) => {
          Swal.fire({
            icon: 'success',
            text: `El almacen se ha añadido correctamente`,
          })
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.mensaje,
          })
        }
        )
     }
     this.activeModal.close(true)
  }

  checkCampo(campo: string, valida: string): boolean {
    
    if (
      this.form.get(campo)?.hasError(valida) &&
      this.form.get(campo)?.touched 
    ) {
      return true;
    }
    return false;
  }


  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
   }

}
