import { Component, OnInit } from '@angular/core';
import { ListadoService } from 'src/app/services/listado.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})

export class ListaPedidosComponent implements OnInit {

  constructor(private listadoService: ListadoService) {

  }

  async ngOnInit() {
    const response = await this.listadoService.getAll();

    console.log(response[0]);

  }
  rows = [
    { referencia: 'Austin', estado: 'Male', fechaSalida: 'Swimlane', almacenOrigen: 'Swimlane', almacenDestino: 'Swimlane', matricula: 22 },
    { referencia: 'Dany', estado: 'Male', fechaSalida: 'KFC', almacenOrigen: 'Swimlane', almacenDestino: 'Swimlane', matricula: 'Swimlane'  },
    { referencia: 'Molly', estado: 'Female', fechaSalida: 'Burger King', almacenOrigen: 'Swimlane', almacenDestino: 'Swimlane', matricula: 'Swimlane'  }
  ];
  columns = [{ prop: 'name' }, { name: 'Referencia' }, { name: 'Estado' }, { name: 'Fecha salida' }, 
             { name: 'Almacen origen' }, { name: 'Almacen destino' }, { name: 'Matrícula' }];

}
