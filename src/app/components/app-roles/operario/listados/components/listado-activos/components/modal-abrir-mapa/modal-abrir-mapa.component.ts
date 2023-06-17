import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-abrir-mapa',
  templateUrl: './modal-abrir-mapa.component.html',
  styleUrls: ['./modal-abrir-mapa.component.css']
})
export class ModalAbrirMapaComponent{
  
  latitude!: number;
  longitude!: number;
  
  public origin: any
  public destination: any
  
  ngOnInit() {
    this.getDirection()
  }
  
  getDirection() {
  
    this.origin = 'León'
    this.destination = 'Madrid'
  }
}