import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../services/actividad.service';
import { DocenteService } from '../services/docente.service';
import { Docente } from '../models/docente';
import { Actividad } from '../models/actividad';
import { PlanAccionesService } from '../services/plan-acciones.service';
import { PlanAcciones } from '../models/plan-acciones';

@Component({
  selector: 'app-plan-acciones-list',
  templateUrl: './plan-acciones-list.component.html',
  styleUrls: ['./plan-acciones-list.component.css']
})
export class PlanAccionesListComponent implements OnInit {
  docente:Docente;  
    actividades: Actividad[];
    planes: PlanAcciones[];
  constructor(private actividadService:ActividadService, private docenteService:DocenteService,private planService:PlanAccionesService) { }

  ngOnInit() {
    this.getDocente();
    this.getPlanes();
    
  }

    getPlanes() {
        this.planService.getPlanesByDocente(this.docente.idDocente).subscribe(planes => {
          this.planes = planes
          console.log(this.planes);
        });
  }
  getDocente() {
    this.docente = this.docenteService.getDocenteLS();
  }
      
}
