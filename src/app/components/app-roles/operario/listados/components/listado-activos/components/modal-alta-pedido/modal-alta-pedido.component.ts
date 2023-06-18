import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validator, FormControl, FormControlName } from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ListadoActivos } from 'src/app/components/app-roles/operario/interfaces';
import { Almacenes } from 'src/app/interfaces';
import { ListadosService } from 'src/app/components/app-roles/operario/services/listados.service';
import { DatePipe } from '@angular/common';
import { ListadosEncargadoService } from 'src/app/components/app-roles/encargado/services/listados.service';


@Component({
  selector: 'app-modal-alta-pedido',
  templateUrl: './modal-alta-pedido.component.html',
  styleUrls: ['./modal-alta-pedido.component.css'],
  providers: [DatePipe, ListadosEncargadoService]
})
export class ModalAltaPedidoComponent implements OnInit, OnDestroy{

  private destroyed$ = new Subject<void>()
  public almacenes: Almacenes[] = [];
  @Input() pedido!: ListadoActivos
  public form!: FormGroup

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private listadoService: ListadosService, private datePipe: DatePipe, private encargadoService: ListadosEncargadoService){}

  onDateChange(newDate: Date) {
    console.log(newDate);
  }

  ngOnInit(): void {
    this.listadoService.obtenerAlmacenes().subscribe(a => {this.almacenes = a, console.log(a)})
 
  if (this.pedido != undefined && this.pedido.fecha_salida) {
    this.pedido.estado != 'NUEVO' && this.pedido.estado != 'ERROR'? 
    this.form = this.fb.group({
      almacen_destino: [{value: this.pedido.almacen_destino , disabled:true}],
      almacen_origen: [{value: this.pedido.almacen_origen, disabled:true}],
      fecha_salida: [{value: new Date(this.pedido.fecha_salida), disabled:true}],
      matricula: [{value:this.pedido.matricula, disabled:true}],
      detalles: [{value:this.pedido.detalles, disabled:true}],
      comentario_error: [null]
    }):
    this.form = this.fb.group({
      almacen_destino: [this.pedido.almacen_destino],
      almacen_origen: [this.pedido.almacen_origen],
      fecha_salida: [new Date(this.pedido.fecha_salida)],
      matricula: [this.pedido.matricula],
      detalles: [this.pedido.detalles],
      comentario_error: [{value:this.pedido.comentario_error, disabled:true}]
    })
  }else{
    this.form = this.fb.group({
      almacen_destino: [null],
      almacen_origen: [null],
      fecha_salida: [null],
      matricula: [null],
      detalles: [null],
      comentario_error: [null]
    })
  }
  }
  
onSubmit(){
  const pedido: ListadoActivos = {
  almacen_destino: this.form.value.almacen_destino,
  almacen_origen: this.form.value.almacen_origen,
  matricula: this.form.value.matricula,
  detalles: this.form.value.detalles,
  fecha_salida: this.datePipe.transform(this.form.value.fecha_salida, 'YYYY-MM-dd')
}

if(this.pedido){
  this.listadoService.editPedido(pedido, this.pedido.referencia ).subscribe(resp => console.log(resp))
}else {
  this.listadoService.addPedidos(pedido).subscribe(resp => console.log(resp))
}    
    this.activeModal.close(true)

  }

  enviarRevision(){
    const pedido: ListadoActivos = {
      almacen_destino: this.form.value.almacen_destino,
      almacen_origen: this.form.value.almacen_origen,
      matricula: this.form.value.matricula,
      detalles: this.form.value.detalles,
      fecha_salida: this.datePipe.transform(this.form.value.fecha_salida, 'YYYY-MM-dd'),
      estado: this.pedido.estado
    }
    this.listadoService.envioRevision(this.pedido.referencia).subscribe(resp => {
      console.log(resp)
      this.activeModal.close(true)
    })
  }

  aprobarPedido(){
   this.encargadoService.aprobarPedido(this.pedido.referencia).subscribe(resp =>{
    console.log(resp)
    this.activeModal.close(true)
   })
  }
  denegarPedido(){
this.encargadoService.rechazarPedido(this.pedido.referencia, this.form.value.comentario_error).subscribe(resp =>{
  console.log(resp)
  this.activeModal.close(true)
})
  }
  cerrarPedido(){
    this.listadoService.cerrarPedido(this.pedido.referencia).subscribe(resp => {
      console.log(resp)
      this.activeModal.close(true)
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
   }

}
