import { Component, OnInit } from '@angular/core';
import { PlanAccionesService } from '../services/plan-acciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActividadService } from '../services/actividad.service';
import { DocenteService } from '../services/docente.service';
import { PlanAcciones } from '../models/plan-acciones';
import { JefeDepartamento } from '../models/jefe-departamento';
import { JefeDepartamentoService } from '../services/jefe-departamento.service';
import { Actividad } from '../models/actividad';
import { Docente } from '../models/docente';

@Component({
  selector: 'app-full-plan-see',
  templateUrl: './full-plan-see.component.html',
  styleUrls: ['./full-plan-see.component.css']
})
export class FullPlanSeeComponent implements OnInit {
plan:PlanAcciones;
jefeDpto:JefeDepartamento;
progreso:string;
porcentajeDesarrollo:number;
  constructor(
    private planService:PlanAccionesService,
    private route: ActivatedRoute,
    private location:Location,
    private actividadService:ActividadService,
    private docenteService:DocenteService,
    private router:Router,
    private jefeDptoService:JefeDepartamentoService
    
    
  ) { }

  ngOnInit() {
    this.getPlan();
    this.plan=new PlanAcciones();
    this.plan.actividad=new Actividad();
    this.plan.actividad.docente=new Docente();
  }

  getPlan(): void {
    var numeroAccionesPlaneadas=0;
    var numeroAccionesRealizadas=0;
    const id = +this.route.snapshot.paramMap.get("idActividad");
    this.planService.getPlanByActividad(id).subscribe(plan => {
      (this.plan = plan);
     
      this.jefeDpto=this.jefeDptoService.getJefeLS();
      if(this.jefeDpto.departamento.idDepartamento!=this.plan.actividad.docente.departamento.idDepartamento){
        console.log(this.jefeDpto);
        console.log(plan.actividad.docente);
        this.goBack();
      }
      this.plan.acciones.forEach(element => {
        numeroAccionesPlaneadas++;
        if(element.accionRealizada.trim()!=''){
          numeroAccionesRealizadas++;
        }
      });
      this.porcentajeDesarrollo=this.calcularPorcentajeDesarrollo(numeroAccionesPlaneadas,numeroAccionesRealizadas);
      this.progreso=this.porcentajeDesarrollo.toPrecision(3)+"%";
    });
  }
  goBack(): void {
    this.location.back();
  }
  public createImgPath = (serverPath: string) => {
    //`https://localhost:5001/${serverPath}`;
    window.open(`https://localhost:5001/${serverPath}`,"_blank");
  }
  calcularPorcentajeDesarrollo(numeroAccionesPlaneadas:number, numeroAccionesRealizadas:number):number{
    var porcentajeDesarrolloPorAccion=100/numeroAccionesPlaneadas;
    var porcentajeDesarrolloTotal=porcentajeDesarrolloPorAccion*numeroAccionesRealizadas;
    return porcentajeDesarrolloTotal;

  }


}
