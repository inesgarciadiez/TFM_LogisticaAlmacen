import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validator, FormControl, FormControlName } from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ListadoActivos } from 'src/app/components/app-roles/operario/interfaces';
import { Almacenes } from 'src/app/interfaces';
import { ListadosService } from 'src/app/components/app-roles/operario/services/listados.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-modal-alta-pedido',
  templateUrl: './modal-alta-pedido.component.html',
  styleUrls: ['./modal-alta-pedido.component.css'],
  providers: [DatePipe]
})
export class ModalAltaPedidoComponent implements OnInit, OnDestroy{

  private destroyed$ = new Subject<void>()
  public almacenes: Almacenes[] = []
  @Input() pedido!: ListadoActivos
  public form!: FormGroup

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private listadoService: ListadosService, private datePipe: DatePipe){}

  onDateChange(newDate: Date) {
    console.log(newDate);
  }

  ngOnInit(): void {
    this.listadoService.obtenerAlmacenes().subscribe(a => {this.almacenes = a, console.log(a)})
 
  if (this.pedido != undefined) {
    this.pedido.estado != 'NUEVO' && this.pedido.estado != 'ERROR' && this.pedido.estado != 'LISTO_SALIDA' ? 
    this.form = this.fb.group({
      almacen_destino: [{value: this.pedido.almacen_destino , disabled:true}],
      almacen_origen: [{value: this.pedido.almacen_origen, disabled:true}],
      fecha_salida: [{value: this.pedido.fecha_salida, disabled:true}],
      matricula: [{value:this.pedido.matricula, disabled:true}],
      detalles: [{value:this.pedido.detalles, disabled:true}]
    }):
    this.form = this.fb.group({
      almacen_destino: [this.pedido.almacen_destino],
      almacen_origen: [this.pedido.almacen_origen],
      fecha_salida: [this.pedido.fecha_salida],
      matricula: [this.pedido.matricula],
      detalles: [this.pedido.detalles]
    })
  }else{
    this.form = this.fb.group({
      almacen_destino: [null],
      almacen_origen: [null],
      fecha_salida: [null],
      matricula: [null],
      detalles: [null]
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

    // if (this.pedido != undefined) {
    //   this.form  = this.fb.group({
    //     estado_id: 7,
    //     fecha_salida: [this.pedido.fecha_salida],
    //     almacen_origen: [this.pedido.almacen_origen],
    //     almacen_destino: [this.pedido.almacen_destino],
    //     matricula: [this.pedido.matricula],
    //     detalles: [this.pedido.detalles],
    //     comentario_error: [this.pedido.comentario_error]
    //   })
    //   console.log(this.form.value);

    //   const response = this.listadoService.editPedido(this.form.value, this.pedido.referencia).subscribe(resp =>{
    //     console.log(resp)
    //    });
    //   console.log(response);

    // }
    // else {
    //   const response = this.listadoService.addPedido(this.form.value);
    //   console.log(response);
    // }
    
    this.activeModal.close(true)

  }

  enviarRevision(){
    const pedido: ListadoActivos = {
      almacen_destino: this.form.value.almacen_destino,
      almacen_origen: this.form.value.almacen_origen,
      matricula: this.form.value.matricula,
      detalles: this.form.value.detalles,
      fecha_salida: this.datePipe.transform(this.form.value.fecha_salida, 'YYYY-MM-dd')
    }
    console.log(pedido)
    this.listadoService.envioRevision(this.pedido.referencia ).subscribe(resp => console.log(resp))
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
   }

}
