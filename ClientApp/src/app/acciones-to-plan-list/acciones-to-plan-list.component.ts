import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../services/actividad.service';
import { DocenteService } from '../services/docente.service';
import { Docente } from '../models/docente';
import { Actividad } from '../models/actividad';


@Component({
  selector: 'app-acciones-to-plan-list',
  templateUrl: './acciones-to-plan-list.component.html',
  styleUrls: ['./acciones-to-plan-list.component.css']
})
export class AccionesToPlanListComponent implements OnInit {

  docente:Docente;  
  actividades:Actividad[];
  constructor(private actividadService:ActividadService, private docenteService:DocenteService) { }

  ngOnInit() {
    this.getDocente();
    this.getActividades();
  }

  getActividades() {
    this.actividadService
      .getActividadesDocente(this.docente.idDocente)
      .subscribe(actividades => {
        this.actividades = actividades;
       
        if (this.actividades.length <= 0) {
          alert("El docente no tiene actividades asignadas");
        }
      });
  }
  getDocente() {
    this.docente = this.docenteService.getDocenteLS();
  }
}
