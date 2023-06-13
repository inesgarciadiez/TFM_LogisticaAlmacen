import { Component, ViewChild } from '@angular/core';
import { PedidosInterface } from '../../../interfaces';
import { Roles } from 'src/app/shared/rol-enum';
import { Subject } from 'rxjs';
import { ListadosService } from '../../../services/listados.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListadoActivos } from 'src/app/components/app-roles/operario/interfaces';

@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.css']
})
export class ListadoPedidosComponent {
  @ViewChild ("search", {static: false}) search: any

  public dataListadoActivos: ListadoActivos[] = [];


  public rows: Array<object> = []; 
  public columns: Array<object> = [];
  public temp: Array<object> = [];
  public dataPedidoMostrar: PedidosInterface[] = [];
  public rol! : Roles
  private destroyed$ = new Subject<void>()

  constructor(private listadoService: ListadosService, private modalService: NgbModal) {

  }

  async ngOnInit() {
     const response = await this.listadoService.obtenerPedidos().subscribe( pedidos => {
      this.dataPedidoMostrar = pedidos.map((u) => {
        const pedido: PedidosInterface = {
          id: u.id,
          fecha_creacion: u.fecha_creacion,
          fecha_salida: u.fecha_salida,
          detalles: u.detalles,
          almacen_destino: u.almacen_destino,
          matricula: u.matricula
        }
        return pedido
      })
      this.temp = this.dataPedidoMostrar;
      this.rows = [...this.temp]
      console.log(pedidos)
    });

    this.columns = [ 
      { prop: "id", name: 'Id' }, 
      { prop: "fecha_creacion", name: 'Fecha Creación' }, 
      { prop: "fecha_salida", name: 'Fecha salida' }, 
      { prop: "detalles", name: 'Detalles' }, 
      { prop: "matricula", name: 'Matrícula' }, 
      { prop: "acciones", name: 'Acciones'}];

  }
}
