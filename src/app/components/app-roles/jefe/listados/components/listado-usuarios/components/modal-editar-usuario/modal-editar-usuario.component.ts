import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from "@angular/forms"
import { Subject } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Users,UsersMostrar } from 'src/app/interfaces'; 
import { ListadosService } from 'src/app/components/app-roles/jefe/services/listados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-editar-usuario',
  templateUrl: './modal-editar-usuario.component.html',
  styleUrls: ['./modal-editar-usuario.component.css']
})
export class ModalEditarUsuarioComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>()
  @Input() usuario!: UsersMostrar
 // @Input() almacenes!: Almacenes[]
  public form!: FormGroup

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal , private listadosService: ListadosService){}

  ngOnInit(): void {
    if(this.usuario != undefined){
      const nombre = this.usuario.nombre.split(" ")
      //this.mostrarAlmacenes = this.usuario.rol_id == 'Encargado'?true: false
      this.form = this.fb.group({
        nombre: [nombre[0], [Validators.required,Validators.minLength(3)]],
        apellidos: [nombre[1], [Validators.required,Validators.minLength(3)]],
        correo: [{value: this.usuario.email, disabled:true}],
        rol: [this.usuario.rol,Validators.required],
        contrasena: [null, [Validators.minLength(8)]]
      })

    }else{
      this.form = this.fb.group({
        nombre: [null, [Validators.required,Validators.minLength(3)]],
        apellidos: [null, [Validators.required,Validators.minLength(3)]],
        correo: [null,[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
        rol: [null,Validators.required],
        contrasena: [null, [Validators.required,Validators.minLength(8)]],
      })
    }
  }

  onSubmit(){
     const usuarioEdit: Users = {
       nombre: this.form.value.nombre,
       apellido: this.form.value.apellidos,
       email: this.form.value.correo,
       password: this.form.value.contrasena,
       rol: this.form.value.rol.charAt(0).toLowerCase() + this.form.value.rol.slice(1),
     }
     console.log(usuarioEdit)
     if(this.usuario!= undefined){
       this.listadosService.editarUsuario(usuarioEdit,this.usuario.id).subscribe(
        (resp) => {
          // Manejar la respuesta exitosa si es necesario
          Swal.fire({
            icon: 'success',
            text: `El usuario ${resp.nombre} ${resp.apellido} se ha editado correctamente`,
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
       this.listadosService.addUsuario(usuarioEdit).subscribe(
        (resp) => {
          // Manejar la respuesta exitosa si es necesario
          Swal.fire({
            icon: 'success',
            text: `El usuario ${resp.nombre} ${resp.apellido} se ha añadido correctamente`,
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

  // changesRol(){
  //   const rol_changes = this.form.get("rol")?.valueChanges;
  //   rol_changes?.pipe(takeUntil(this.destroyed$)).subscribe((rol)=> {
  //     this.mostrarAlmacenes = rol == 'Encargado'?true: false
  //   })
  // }
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
