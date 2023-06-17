import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator } from "@angular/forms"
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ListadoActivos } from 'src/app/components/app-roles/operario/interfaces';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Almacenes } from 'src/app/interfaces';
import { ListadosService } from 'src/app/components/app-roles/operario/services/listados.service';
import * as moment from 'moment';


@Component({
  selector: 'app-modal-alta-pedido',
  templateUrl: './modal-alta-pedido.component.html',
  styleUrls: ['./modal-alta-pedido.component.css']
})
export class ModalAltaPedidoComponent implements OnInit, OnDestroy{

  private destroyed$ = new Subject<void>()
  //@Input() usuario!: ListadoActivos
  public almacenes: Almacenes[] = []
  public myDateValue: Date = new Date;
  public form!: FormGroup

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private listadoService: ListadosService){

  }
  onDateChange(newDate: Date) {
    console.log(newDate);
  }
  ngOnInit(): void {
  this.listadoService.obtenerAlmacenes().subscribe(a => {this.almacenes = a, console.log(a)})
  this.form = this.fb.group({
    almacen_destino: [null],
    almacen_origen: [null],
    fecha_salida: [null],
    matricula: [null],
    detalles: [null]
  })
  }

  
  onSubmit(){
const pedido: ListadoActivos = {
  almacen_destino: this.form.value.almacen_destino,
  almacen_origen: this.form.value.almacen_origen,
  matricula: this.form.value.matricula,
  detalles_carga: this.form.value.detalles,
  fecha_salida: moment(this.form.value).format("YYYY-MM-DD"),
  //estado: "NUEVO"
}

this.listadoService.addPedidos(pedido).subscribe(resp => console.log(resp))
  }


  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
   }

}
