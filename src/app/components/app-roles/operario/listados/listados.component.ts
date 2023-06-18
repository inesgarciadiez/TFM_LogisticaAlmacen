import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-listados-operario',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosOperarioComponent implements OnInit, OnDestroy {

  private destroyed$ = new Subject<void>()

  constructor(private router: Router){
    
  }
  ngOnInit() {}
  
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
   }

}
