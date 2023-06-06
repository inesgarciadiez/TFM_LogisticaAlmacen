import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modal-eliminar-usuario',
  templateUrl: './modal-eliminar-usuario.component.html',
  styleUrls: ['./modal-eliminar-usuario.component.css']
})
export class ModalEliminarUsuarioComponent {
 constructor(public activeModal: NgbActiveModal){}
}
