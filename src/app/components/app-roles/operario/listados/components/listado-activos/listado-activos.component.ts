import { Component, OnInit } from '@angular/core';
import { ListadoService } from 'src/app/services/listado.service';

@Component({
  selector: 'app-listado-activos',
  templateUrl: './listado-activos.component.html',
  styleUrls: ['./listado-activos.component.css']
})

export class ListadoActivosComponent implements OnInit {

  constructor(private listadoService: ListadoService) {

  }

  async ngOnInit() {
    const response = await this.listadoService.getAll();

    console.log(response[0]);

  }

  crearPedido(){
/*     const modalRef = this.modalService.open(ModalEditarUsuarioComponent, { centered: true, size: 'lg'});
    modalRef.componentInstance.almacenes = this.dataAlmacenes
    modalRef.result.then((result) => {
      if(result){
        console.log("creo")
      }
    }); */
  }

  rows = [
    { referencia: 'Austin', estado: 'Male', fechaSalida: 'Swimlane', almacenOrigen: 'Swimlane', almacenDestino: 'Swimlane', matricula: 22 },
    { referencia: 'Dany', estado: 'Male', fechaSalida: 'KFC', almacenOrigen: 'Swimlane', almacenDestino: 'Swimlane', matricula: 'Swimlane'  },
    { referencia: 'Molly', estado: 'Female', fechaSalida: 'Burger King', almacenOrigen: 'Swimlane', almacenDestino: 'Swimlane', matricula: 'Swimlane'  }
  ];
  columns = [{ prop: 'name' }, { name: 'Referencia' }, { name: 'Estado' }, { name: 'Fecha salida' }, 
             { name: 'Almacen origen' }, { name: 'Almacen destino' }, { name: 'Matrícula' }];

}
