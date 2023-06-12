import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validator, FormControl } from "@angular/forms"
import { Router } from '@angular/router';
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
 // @Input() almacenes!: Almacenes[]
  public form: FormGroup
  router = inject(Router);

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
              private listadoService: ListadosService)
              {
                this.form = new FormGroup({
                  fecha_salida: new FormControl(),
                  almacen_origen: new FormControl(),
                  almacen_destino: new FormControl(),
                  matricula: new FormControl(),
                  detalles: new FormControl()
                })
              }

  ngOnInit(): void {

  }

  
  onSubmit(){
    console.log(this.form.value);
    const response = this.listadoService.addPedido(this.form.value);

    console.log(response);
    
    this.activeModal.close(true)

    this.router.navigate(['/listados/listado-activos']);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
   }

}
