import { Component, Input, OnInit } from '@angular/core';
import { ListadoActivos } from 'src/app/components/app-roles/operario/interfaces';
import { ListadosService } from 'src/app/components/app-roles/operario/services/listados.service';

@Component({
  selector: 'app-modal-abrir-mapa',
  templateUrl: './modal-abrir-mapa.component.html',
  styleUrls: ['./modal-abrir-mapa.component.css']
})
export class ModalAbrirMapaComponent implements OnInit {
  @Input() pedido!: ListadoActivos

  latitude!: number;
  longitude!: number;

  public origin: any
  public destination: any

  constructor(private listadoService: ListadosService) { }
  ngOnInit() {
    this.listadoService.obtenerCiudadAlmacen(this.pedido.almacen_origen).subscribe(almacen => {
      for (let i = 0; i < almacen.length; i++) {
        this.origin = almacen[i].ciudad
      }

    })
    this.listadoService.obtenerCiudadAlmacen(this.pedido.almacen_destino).subscribe(almacen => {
      for (let i = 0; i < almacen.length; i++) {
        this.destination = almacen[i].ciudad
      }
    })
  }
}