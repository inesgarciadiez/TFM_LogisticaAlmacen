import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { ListadoActivos } from 'src/app/components/app-roles/operario/interfaces';
import { ListadosService } from 'src/app/components/app-roles/operario/services/listados.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-eliminar-pedido',
  templateUrl: './modal-eliminar-pedido.component.html',
  styleUrls: ['./modal-eliminar-pedido.component.css']
})
export class ModalEliminarPedidoComponent implements OnInit {
  @Input() pedido! : ListadoActivos
 constructor(public activeModal: NgbActiveModal, private listadoService: ListadosService){}

 ngOnInit(): void {
   console.log(this.pedido)
 }

 send() {
  this.listadoService.eliminarPedido(this.pedido.referencia).subscribe(
    (resp) => {
      // Manejar la respuesta exitosa si es necesario
      Swal.fire({
        icon: 'success',
        text: `El pedido se ha eliminado correctamente`,
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
  this.activeModal.close(true)
 }
}
