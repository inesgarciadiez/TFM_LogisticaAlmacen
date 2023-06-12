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

  async ngOnInit() {
    const response = await this.listadoService.obtenerPedidos().subscribe( pedidos => {
      
      this.dataPedidoMostrar = pedidos.map((u) => {
        if (u.estado != "CERRADO") {
          console.log("CERRAADDDOOOO")
          this.temp = this.dataPedidoMostrar;
          this.rows = [...this.temp]
        }
        const pedido: PedidoMostrar = {
          referencia: u.referencia,
          estado: u.estado,
          fecha_salida: u.fecha_salida,
          almacen_origen: u.almacen_origen,
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
      { prop: "referencia", name: 'Referencia' }, 
      { prop: "estado", name: 'Estado' }, 
      { prop: "fecha_salida", name: 'Fecha salida' }, 
      { prop: "almacen_origen", name: 'Almacen origen' }, 
      { prop: "almacen_destino", name: 'Almacen destino' }, 
      { prop: "matricula", name: 'Matrícula' }, 
      { prop: "acciones", name: 'Acciones'}];

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
