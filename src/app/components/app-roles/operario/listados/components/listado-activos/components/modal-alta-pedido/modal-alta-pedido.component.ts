import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ListadoActivos } from 'src/app/components/app-roles/operario/interfaces';
import { Almacenes } from 'src/app/interfaces';
import { ListadosService } from 'src/app/components/app-roles/operario/services/listados.service';
import { DatePipe } from '@angular/common';
import { ListadosEncargadoService } from 'src/app/components/app-roles/encargado/services/listados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-alta-pedido',
  templateUrl: './modal-alta-pedido.component.html',
  styleUrls: ['./modal-alta-pedido.component.css'],
  providers: [DatePipe, ListadosEncargadoService],
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
    this.listadoService.obtenerAlmacenes().subscribe((a) => {
      (this.almacenes = a), console.log(a);
    });

    if (this.pedido != undefined && this.pedido.fecha_salida) {
      this.pedido.estado != 'NUEVO' && this.pedido.estado != 'ERROR'
        ? (this.form = this.fb.group({
            almacen_destino: [
              { value: this.pedido.almacen_destino, disabled: true },
            ],
            almacen_origen: [
              { value: this.pedido.almacen_origen, disabled: true },
            ],
            fecha_salida: [
              { value: new Date(this.pedido.fecha_salida), disabled: true },
            ],
            matricula: [{ value: this.pedido.matricula, disabled: true }],
            detalles: [{ value: this.pedido.detalles, disabled: true }],
            comentario_error: [null, Validators.required],
          }))
        : (this.form = this.fb.group({
            almacen_destino: [this.pedido.almacen_destino, Validators.required],
            almacen_origen: [this.pedido.almacen_origen, Validators.required],
            fecha_salida: [
              new Date(this.pedido.fecha_salida),
              Validators.required,
            ],
            matricula: [
              this.pedido.matricula,
              [Validators.required, Validators.minLength(5)],
            ],
            detalles: [
              this.pedido.detalles,
              [Validators.required, Validators.minLength(5)],
            ],
            comentario_error: [
              { value: this.pedido.comentario_error, disabled: true },
            ],
          }));
    } else {
      this.form = this.fb.group({
        almacen_destino: [null, Validators.required],
        almacen_origen: [null, Validators.required],
        fecha_salida: [null, Validators.required],
        matricula: [null, [Validators.required, Validators.minLength(5)]],
        detalles: [null, [Validators.required, Validators.minLength(5)]],
        comentario_error: [null],
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
    }
    const pedido: ListadoActivos = {
      almacen_destino: this.form.value.almacen_destino,
      almacen_origen: this.form.value.almacen_origen,
      matricula: this.form.value.matricula,
      detalles: this.form.value.detalles,
      fecha_salida: this.datePipe.transform(
        this.form.value.fecha_salida,
        'YYYY-MM-dd'
      ),
    };

    if (this.pedido) {
      this.listadoService.editPedido(pedido, this.pedido.referencia).subscribe(
        (resp) => {
          // Manejar la respuesta exitosa si es necesario
          Swal.fire({
            icon: 'success',
            text: `El pedido se ha editado correctamente`,
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.mensaje,
          });
        }
      );
    } else {
      this.listadoService.addPedidos(pedido).subscribe(
        (resp) => {
          Swal.fire({
            icon: 'success',
            text: `El pedido se ha creado correctamente`,
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.mensaje,
          });
        }
      );
    }
    this.activeModal.close(true);
  }

  enviarRevision() {
    const pedido: ListadoActivos = {
      almacen_destino: this.form.value.almacen_destino,
      almacen_origen: this.form.value.almacen_origen,
      matricula: this.form.value.matricula,
      detalles: this.form.value.detalles,
      fecha_salida: this.datePipe.transform(
        this.form.value.fecha_salida,
        'YYYY-MM-dd'
      ),
      estado: this.pedido.estado,
    };
    this.listadoService.envioRevision(this.pedido.referencia).subscribe(
      (resp) => {
        // Manejar la respuesta exitosa si es necesario
        Swal.fire({
          icon: 'success',
          text: `El pedido se ha enviado a revisión`,
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.mensaje,
        });
      }
    );
    this.activeModal.close(true);
  }

  aprobarPedido() {
    this.encargadoService.aprobarPedido(this.pedido.referencia).subscribe(
      (resp) => {
        // Manejar la respuesta exitosa si es necesario
        Swal.fire({
          icon: 'success',
          text: `El pedido se ha aprobado con exito`,
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.mensaje,
        });
      }
    );
    this.activeModal.close(true);
  }
  denegarPedido() {
    console.log(this.form.value);
    const comentario = {
      comentario_error: this.form.value.comentario_error,
    };
    this.encargadoService
      .rechazarPedido(this.pedido.referencia, comentario)
      .subscribe(
        (resp) => {
          // Manejar la respuesta exitosa si es necesario
          Swal.fire({
            icon: 'success',
            text: `El pedido ha sido denegado por ${comentario.comentario_error}`,
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.mensaje,
          });
        }
      );
    this.activeModal.close(true);
  }
  cerrarPedido() {
    this.listadoService.cerrarPedido(this.pedido.referencia).subscribe(
      (resp) => {
        // Manejar la respuesta exitosa si es necesario
        Swal.fire({
          icon: 'success',
          text: `El pedido se ha cerrado correctamente`,
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.mensaje,
        });
      }
    );
    this.activeModal.close(true);
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
