import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-listados',
  templateUrl: '../listados/listados.component.html',
  styleUrls: ['../listados/listados.component.css']
})
export class ListadosComponent implements OnInit, OnDestroy{

  private destroyed$ = new Subject<void>()

  constructor(private router: Router){
    
  }
  ngOnInit() {}
  
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
   }

}
