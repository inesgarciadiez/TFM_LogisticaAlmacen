import { Component,OnInit,OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Almacenes, Users, UsersMostrar, } from 'src/app/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime, forkJoin, fromEvent, map } from 'rxjs';
import { ListadosService } from '../../../services/listados.service';
import { AlmacenesMostrar } from 'src/app/interfaces';
import { ModalEditarAlmacenComponent } from './components/modal-editar-almacen/modal-editar-almacen.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-listado-almacenes',
  templateUrl: './listado-almacenes.component.html',
  styleUrls: ['./listado-almacenes.component.css']
})
export class ListadoAlmacenesComponent {
  @ViewChild ("search", {static: false}) search: any;

  public rows: Array<object> = []; 
  public columns: Array<object> = [];
  public temp: Array<object> = [];
  public usuarios: Users[] = [];
  public almacenesMostrar: AlmacenesMostrar[] = [];
  private destroyed$ = new Subject<void>()
  
 constructor(private modalService: NgbModal, private listadosService: ListadosService){}

  ngOnInit() {
    this.getAlmacenes()
      this.columns = [
        { prop: "nombre", name: "Nombre" },
        { prop: "ciudad", name: "Ciudad" },
        { prop: "direccion", name: "Dirección" },
        { prop: "codigo_postal", name: "Código Postal" },
        { prop: "name_responsable", name: "Resposnable" },
      ]
  }

  getAlmacenes(){
    this.listadosService.obtenerAlmacenes().subscribe(almacenes => {
      const requests = almacenes
        .filter(a => a.responsable_id !== null)
        .map(a => this.listadosService.usuarioByID(a.responsable_id));
      forkJoin(requests).subscribe(responses => {
        let index = 0;
        this.almacenesMostrar = almacenes.map(a => {
          const almacen: AlmacenesMostrar = {
            ciudad: a.ciudad,
            direccion: a.direccion,
            codigo_postal: a.codigo_postal,
            nombre: a.nombre,
            name_responsable: '',
            id_responsable: a.responsable_id,
            id: a.id
          };
          if (a.responsable_id !== null) {
            almacen.name_responsable = `${responses[index]?.nombre} ${responses[index]?.apellido}`;
            index++;
          }
          return almacen;
        });
        this.temp = this.almacenesMostrar;
        this.rows = [...this.temp];
      });
    });
  }
  
  editarAlmacen(almacen: Almacenes){
    const modalRef = this.modalService.open(ModalEditarAlmacenComponent, { centered: true, size: 'lg'});
    modalRef.componentInstance.almacen = almacen
    modalRef.result.then((result) => {
      if(result){
        this.getAlmacenes()
       
      }
    });
  }
  crearUsuario(){
    const modalRef = this.modalService.open(ModalEditarAlmacenComponent, { centered: true, size: 'lg'});
    modalRef.result.then((result) => {
      if(result){
        this.getAlmacenes()
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
                   .indexOf(value) !== -1) || !value
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
