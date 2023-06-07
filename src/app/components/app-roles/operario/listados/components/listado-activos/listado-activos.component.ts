import { Component, OnInit, ViewChild } from '@angular/core';
import { ListadoService } from 'src/app/services/listado.service';
import { ListadoActivos } from '../../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAltaPedidoComponent } from './components/modal-alta-pedido/modal-alta-pedido.component';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-listado-activos',
  templateUrl: './listado-activos.component.html',
  styleUrls: ['./listado-activos.component.css']
})

export class ListadoActivosComponent implements OnInit {
  @ViewChild ("search", {static: false}) search: any

  public dataListadoActivos: ListadoActivos[] = [];
  public temp: Array<object> = [];
  public rows: Array<object> = []; 
  public columns: Array<object> = [];

  public dataAlmacenes: ListadoActivos[] = [ 
    { referencia: 1, estado: 'Male', fecha_salida: 'Swimlane', almacen_origen: 'Swimlane', almacen_destino: 'Swimlane', matricula: '22' },
    { referencia: 2, estado: 'Male', fecha_salida: 'KFC', almacen_origen: 'Swimlane', almacen_destino: 'Swimlane', matricula: 'Swimlane'  },
    { referencia: 33, estado: 'Female', fecha_salida: 'Burger King', almacen_origen: 'Swimlane', almacen_destino: 'Swimlane', matricula: 'Swimlane'  }
  ]

  constructor(private listadoService: ListadoService, private modalService: NgbModal) {

  }

  async ngOnInit() {
    const response = await this.listadoService.getAll();

    const pedido: ListadoActivos = {
      referencia: response.referencia,
      estado: response.estado,
      fecha_salida: response.fecha_salida,
      almacen_origen: response.almacen_origen,
      almacen_destino: response.almacen_destino,
      matricula: response.matricula
    }

    console.log(response[0].matricula);

    
    this.rows = [
       { referencia: response[0].referencia, estado: response[0].estado, fechaSalida: response[0].fecha_salida, almacenOrigen: response[0].almacen_origen, almacenDestino: response[0].almacen_destino, matricula: response[0].matricula }
    ];

    this.columns = [ { name: 'Referencia' }, { name: 'Estado' }, { name: 'Fecha salida' }, 
    { name: 'Almacen origen' }, { name: 'Almacen destino' }, { name: 'Matrícula' }, { name: 'Acciones'}];

/*     this.listadoService.getAll().subscribe( pedidos => {
      this.dataListadoActivos = pedidos.map((u)=>{
        const pedido: ListadoActivos = {
          nombre: u.nombre,
          referencia: u.referencia,
          estado: u.estado,
          fecha_salida: u.fecha_salida,
          almacen_origen: u.almacen_origen,
          almacen_destino: u.almacen_destino,
          matricula: u.matricula
        }
      })
    }) */
  }

  crearPedido(){
    const modalRef = this.modalService.open(ModalAltaPedidoComponent, { centered: true, size: 'lg'});
    modalRef.componentInstance.almacenes = this.dataAlmacenes
    modalRef.result.then((result) => {
      if(result){
        console.log("creo")
      }
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map((x:any) => x['target']['value'])
      )
      .subscribe((value) => {
        this.updateFilter(value);
      });
  }
  updateFilter(value: any) {
    throw new Error('Method not implemented.');
  }
/*   rows = [
    { referencia: 'Austin', estado: 'Male', fechaSalida: 'Swimlane', almacenOrigen: 'Swimlane', almacenDestino: 'Swimlane', matricula: 22 },
    { referencia: 'Dany', estado: 'Male', fechaSalida: 'KFC', almacenOrigen: 'Swimlane', almacenDestino: 'Swimlane', matricula: 'Swimlane'  },
    { referencia: 'Molly', estado: 'Female', fechaSalida: 'Burger King', almacenOrigen: 'Swimlane', almacenDestino: 'Swimlane', matricula: 'Swimlane'  }
  ];
  columns = [{ prop: 'name' }, { name: 'Referencia' }, { name: 'Estado' }, { name: 'Fecha salida' }, 
             { name: 'Almacen origen' }, { name: 'Almacen destino' }, { name: 'Matrícula' }];
 */
}
