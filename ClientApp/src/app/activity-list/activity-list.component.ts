import { Component, OnInit } from '@angular/core';
import { Actividad } from '../models/actividad';
import { ActividadService } from '../services/actividad.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  actividades:Actividad[];
  constructor(private actividadService:ActividadService) { }

  ngOnInit() {
    this.getAllActividades();
  }
  getAllActividades(){

this.actividadService.getAll().subscribe(actividades=>this.actividades=actividades);

  }

}
