import { Component, ViewChild } from '@angular/core';
import { PedidosInterface } from '../../../interfaces';
import { ListadosEncargadoService } from '../../../services/listados.service';
import { Subject, debounceTime, fromEvent, map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListadoActivos } from 'src/app/components/app-roles/operario/interfaces';
import { ModalAltaPedidoComponent } from 'src/app/components/app-roles/operario/listados/components/listado-activos/components/modal-alta-pedido/modal-alta-pedido.component';
import { ModalEliminarPedidoComponent } from 'src/app/components/app-roles/operario/listados/components/listado-activos/components/modal-eliminar-pedido/modal-eliminar-pedido.component';

@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.css']
})
export class ListadoPedidosComponent {
  @ViewChild ("search", {static: false}) search: any


  public rows: Array<object> = []; 
  public columns: Array<object> = [];
  public temp: Array<object> = [];
  public pedidos: ListadoActivos[] = [];
  private destroyed$ = new Subject<void>()

  constructor(private listadoService: ListadosEncargadoService, private modalService: NgbModal) {

  }

   ngOnInit() {
    this.columns = [ 
      { prop: "estado", name: 'Estado' }, 
      { prop: "fecha_salida", name: 'Fecha salida' }, 
      { prop: "almacen_origen", name: 'Almacen origen' }, 
      { prop: "almacen_destino", name: 'Almacen destino' }, 
      { prop: "matricula", name: 'Matrícula' },
    ];
    
 this.obtenerPedidos()

  }

  obtenerPedidos(){
    this.listadoService.obtenerPedidos().subscribe( pedidos => {
      this.pedidos = pedidos
      this.temp = this.pedidos;
      this.rows = [...this.temp]
    });
  }

  editarPedido(pedido: ListadoActivos) {
    const modalRef = this.modalService.open(ModalAltaPedidoComponent, { centered: true, size: 'xl' });
    modalRef.componentInstance.pedido = pedido
    modalRef.result.then((result) => {
      if (result) {
        this.obtenerPedidos()
        console.log("edito")
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
  
  updateFilter(val: any) {
    const value = val.toString().toLowerCase().trim();
      const count = this.columns.length;
      const keys = Object.keys(this.temp[0]);
      this.rows = this.temp.filter((item:any) => {
        let shouldFilter = false;
         for (let i = 0; i <= count; i++) {
           if (
             (item[keys[i]] &&
               item[keys[i]]
                 .toString()
                 .toLowerCase()
                 .indexOf(value) !== -1) ||
             !value
           ) {
            shouldFilter = true
           }
         }
         return shouldFilter
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
   }
}
