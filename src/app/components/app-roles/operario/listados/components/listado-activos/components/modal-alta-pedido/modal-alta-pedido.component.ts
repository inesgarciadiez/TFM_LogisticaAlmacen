import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validator, FormControl, FormControlName } from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ListadoActivos } from 'src/app/components/app-roles/operario/interfaces';
import { ListadosService } from 'src/app/components/app-roles/operario/services/listados.service';

@Component({
  selector: 'app-modal-alta-pedido',
  templateUrl: './modal-alta-pedido.component.html',
  styleUrls: ['./modal-alta-pedido.component.css']
})
export class ModalAltaPedidoComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>()
  @Input() pedido!: ListadoActivos
  public form!: FormGroup
  router = inject(Router);

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
              private listadoService: ListadosService, private activateRoute: ActivatedRoute)
              {
                this.form = new FormGroup({
                  estado: new FormControl(),
                  nuevoEstado: new FormControl(),
                  fecha_salida: new FormControl(),
                  almacen_origen: new FormControl(),
                  almacen_destino: new FormControl(),
                  matricula: new FormControl(),
                  detalles: new FormControl(),
                  comentario_error: new FormControl()
                })
              }

  ngOnInit(): void {
    //console.log(this.pedido)
    if (this.pedido != undefined) {
      this.form = this.fb.group({
        estado: [this.pedido.nuevoEstado],
        nuevoEstado: [this.pedido.nuevoEstado],
        fecha_salida: [this.pedido.fecha_salida],
        almacen_origen: [this.pedido.almacen_origen],
        almacen_destino: [this.pedido.almacen_destino],
        matricula: [this.pedido.matricula],
        detalles: [this.pedido.detalles],
        comentario_error: [this.pedido.comentario_error]
      })
    }
  }

  
  onSubmit(){
    if (this.pedido != undefined) {
      this.form  = this.fb.group({
        estado_id: 7,
        fecha_salida: [this.pedido.fecha_salida],
        almacen_origen: [this.pedido.almacen_origen],
        almacen_destino: [this.pedido.almacen_destino],
        matricula: [this.pedido.matricula],
        detalles: [this.pedido.detalles],
        comentario_error: [this.pedido.comentario_error]
      })
      console.log(this.form.value);

      const response = this.listadoService.editPedido(this.form.value, this.pedido.referencia).subscribe(resp =>{
        console.log(resp)
       });
      console.log(response);

    }
    else {
      const response = this.listadoService.addPedido(this.form.value);
      console.log(response);
    }
    
    this.activeModal.close(true)

    this.router.navigate(['/listados/listado-activos']);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
   }

}
