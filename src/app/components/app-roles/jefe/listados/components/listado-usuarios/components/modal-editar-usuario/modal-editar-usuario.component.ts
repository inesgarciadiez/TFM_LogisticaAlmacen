import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator } from "@angular/forms"
import { Subject } from 'rxjs';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Users, UsersMostrar } from 'src/app/components/app-roles/jefe/interfaces'; 

import { Roles } from 'src/app/shared/rol-enum';

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

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal){}

  ngOnInit(): void {
    if(this.usuario != undefined){
      const nombre = this.usuario.nombre.split(" ")
      //this.mostrarAlmacenes = this.usuario.rol_id == 'Encargado'?true: false
      this.form = this.fb.group({
        nombre: [nombre[0]],
        apellidos: [nombre[1]],
        correo: [{value: this.usuario.email, disabled:true}],
        rol: [this.usuario.rol],
        contrasena: [this.usuario.contraseña],
        almacen: [this.usuario.almacen?.nombre]
      })

    }else{
      this.form = this.fb.group({
        nombre: [null],
        apellidos: [null],
        correo: [null],
        rol: [null],
        contrasena: [null],
        almacen: [null]
      })

    }
  }

  onSubmit(){
    console.log(typeof Roles[this.form.value.rol])
    const usuarioEdit: Users = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellidos,
      email: this.form.value.correo,
      contraseña: this.form.value.contrasena,
      rol_id: parseInt(Roles[this.form.value.rol]) 
    }
    this.activeModal.close(true)
  }

  // changesRol(){
  //   const rol_changes = this.form.get("rol")?.valueChanges;
  //   rol_changes?.pipe(takeUntil(this.destroyed$)).subscribe((rol)=> {
  //     this.mostrarAlmacenes = rol == 'Encargado'?true: false
  //   })
  // }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
   }

}
