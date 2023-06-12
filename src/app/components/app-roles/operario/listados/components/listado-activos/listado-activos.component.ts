import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ListadoActivos } from '../../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAltaPedidoComponent } from './components/modal-alta-pedido/modal-alta-pedido.component';
import { Subject, debounceTime, fromEvent, map } from 'rxjs';
import { PedidoMostrar } from '../../../interfaces/pedido-mostrar.interface';
import { ListadosService } from '../../../services/listados.service';


@Component({
  selector: 'app-listado-activos',
  templateUrl: './listado-activos.component.html',
  styleUrls: ['./listado-activos.component.css']
})

export class ListadoActivosComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild ("search", {static: false}) search: any
  public rows: Array<object> = []; 
  public columns: Array<object> = [];
  public temp: Array<object> = [];
  public pedidos: ListadoActivos[] = [];
  public dataPedidoMostrar: PedidoMostrar[] = [];
  private destroyed$ = new Subject<void>()

  constructor(private listadoService: ListadosService, private modalService: NgbModal) {

  }

 ngOnInit() {
  this.columns = [ 
    { prop: "referencia", name: 'Referencia' }, 
    { prop: "estado", name: 'Estado' }, 
    { prop: "fecha_salida", name: 'Fecha salida' }, 
    { prop: "almacen_origen", name: 'Almacen origen' }, 
    { prop: "almacen_destino", name: 'Almacen destino' }, 
    { prop: "matricula", name: 'Matrícula' }
  ]
    this.listadoService.obtenerPedidos().subscribe( pedidos => {
      for (let i = 0; i < pedidos.length ; i++)
      {
        if (pedidos[i].estado.includes("CERRADO") == false) {
          this.pedidos.push(pedidos[i])
          this.temp = this.pedidos;
          this.rows = [...this.temp]

        }

      }
    });
  }

  crearPedido(){
    const modalRef = this.modalService.open(ModalAltaPedidoComponent, { centered: true, size: 'lg'});
    //modalRef.componentInstance.almacenes = this.dataAlmacenes
    modalRef.result.then((result) => {
      if(result){
        console.log("creo")
      }
    });
  }
  
  editarPedido(pedido: ListadoActivos) {

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
