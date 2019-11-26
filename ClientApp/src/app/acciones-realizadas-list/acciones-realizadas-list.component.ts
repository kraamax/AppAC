import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-acciones-realizadas-list',
  templateUrl: './acciones-realizadas-list.component.html',
  styleUrls: ['./acciones-realizadas-list.component.css']
})
export class AccionesRealizadasListComponent implements OnInit {
@Input() id:number;
  constructor() { }

  ngOnInit() {
    
  }

}
