import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator } from "@angular/forms"
import { Subject } from 'rxjs';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Users,UsersMostrar } from 'src/app/interfaces'; 

import { Roles } from 'src/app/shared/rol-enum';
import { ListadosService } from 'src/app/components/app-roles/jefe/services/listados.service';
import { id } from '@swimlane/ngx-datatable';

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
        nombre: [nombre[0]],
        apellidos: [nombre[1]],
        correo: [{value: this.usuario.email, disabled:true}],
        rol: [this.usuario.rol],
        contrasena: [null]
      })

    }else{
      this.form = this.fb.group({
        nombre: [null],
        apellidos: [null],
        correo: [null],
        rol: [null],
        contrasena: [null],
      })
    }
  }

  onSubmit(){
    // console.log(this.usuario.id)
     const usuarioEdit: Users = {
       nombre: this.form.value.nombre,
       apellido: this.form.value.apellidos,
       email: this.form.value.correo,
       password: this.form.value.contrasena,
       rol: this.form.value.rol.charAt(0).toLowerCase() + this.form.value.rol.slice(1),
     }
     console.log(usuarioEdit)
     if(this.usuario!= undefined){
       this.listadosService.editarUsuario(usuarioEdit,this.usuario.id).subscribe(resp =>{
         console.log(resp)
        })
     }else{
       this.listadosService.addUsuario(usuarioEdit).subscribe(resp =>{
        console.log(resp)
       })
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
