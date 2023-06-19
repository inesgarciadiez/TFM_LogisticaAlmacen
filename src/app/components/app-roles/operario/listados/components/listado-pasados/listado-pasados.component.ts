import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ListadoActivos } from '../../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime, fromEvent, map } from 'rxjs';
import { PedidoMostrar } from '../../../interfaces/pedido-mostrar.interface';
import { ListadosService } from '../../../services/listados.service';

@Component({
  selector: 'app-listado-pasados',
  templateUrl: './listado-pasados.component.html',
  styleUrls: ['./listado-pasados.component.css']
})

export class ListadoPasadosComponent implements OnInit, OnDestroy, AfterViewInit {
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
      this.listadoService.obtenerPedidos().subscribe( pedidos => {
       this.pedidos = pedidos.filter(p => p.estado == "CERRADO")
       this.temp = this.pedidos;
       this.rows = [...this.temp]
    });

    this.columns = [ 
      { prop: "estado", name: 'Estado' }, 
      { prop: "fecha_salida", name: 'Fecha salida' }, 
      { prop: "almacen_origen", name: 'Almacen origen' }, 
      { prop: "almacen_destino", name: 'Almacen destino' }, 
      { prop: "matricula", name: 'Matrícula'}, 
      { prop: "detalles", name: 'Detalles de la carga'}, 
      
];

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
