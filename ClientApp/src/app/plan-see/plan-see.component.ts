import { Component, OnInit } from '@angular/core';
import { PlanAccionesService } from '../services/plan-acciones.service';
import { ActivatedRoute } from '@angular/router';
import { PlanAcciones } from '../models/plan-acciones';
import { Location } from '@angular/common';
import { Accion } from '../models/accion';
import { ActividadService } from '../services/actividad.service';
import { Actividad } from '../models/actividad';

@Component({
  selector: 'app-plan-see',
  templateUrl: './plan-see.component.html',
  styleUrls: ['./plan-see.component.css']
})
export class PlanSeeComponent implements OnInit {
  plan:PlanAcciones;
actividad:Actividad;

  constructor(
    private planService:PlanAccionesService,
    private route: ActivatedRoute,
    private location:Location,
    private actividadService:ActividadService
    
    ) { }

  ngOnInit() {

    this.plan={acciones:[],actividad:null,fecha:null,idPlanAcciones:0}
    this.getPlan();
  }
  getPlan(): void {
    const id = +this.route.snapshot.paramMap.get("idActividad");
    this.planService.getPlanByActividad(id).subscribe(plan => {
      (this.plan = plan);
 
    });
  }
  /*update(): void {
    this.docenteService.update(this.docente).subscribe(() => this.goBack());
  }*/
  deletePlan(): void {
    this.actividad=this.plan.actividad;
    this.planService.delete(this.plan).subscribe(() => {
      this.actividad.estado='Asignada';
      this.actividadService.update(this.actividad).subscribe();
      this.goBack()});

  }
  goBack(): void {
    this.location.back();
  }

}
