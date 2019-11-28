import { Component, OnInit } from '@angular/core';
import { PlanAccionesService } from '../services/plan-acciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadService } from '../services/actividad.service';
import { DocenteService } from '../services/docente.service';
import { PlanAcciones } from '../models/plan-acciones';
import { Docente } from '../models/docente';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccionRealizadaAddComponent } from '../accion-realizada-add/accion-realizada-add.component';
import { Actividad } from '../models/actividad';

@Component({
  selector: 'app-acciones-plist',
  templateUrl: './acciones-plist.component.html',
  styleUrls: ['./acciones-plist.component.css']
})
export class AccionesPListComponent implements OnInit {
  plan:PlanAcciones;
  docente:Docente;
  actividad:Actividad;
  constructor(
    private planService:PlanAccionesService,
    private route: ActivatedRoute,
    private location:Location,
    private actividadService:ActividadService,
    private docenteService:DocenteService,
    private modalService: NgbModal,
    private router:Router
    
  ) { }

  ngOnInit() {
    this.actividad=new Actividad();
    this.plan=new PlanAcciones();
    this.plan.actividad=this.actividad;
    this.getPlan();
    
  }
  getPlan(): void {
    const id = +this.route.snapshot.paramMap.get("idPlan");
    this.planService.get(id).subscribe(plan => {
      (this.plan = plan);
      console.log(this.plan);
      this.docente=this.docenteService.getDocenteLS();
      if(this.docente.idDocente!=this.plan.actividad.docente.idDocente){
        this.goBack();
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
  addAccionRealizada(idNumber:number){

    var mesage = this.modalService.open(AccionRealizadaAddComponent);
    mesage.componentInstance.idAccion = idNumber;

    mesage.result.then((result) => {
      if ( result === 'success' ) {
      this.getPlan(); // Refresh Data in table grid
      }
    }, (reason) => {
    });
  
  }
  public createImgPath = (serverPath: string) => {
    //`https://localhost:5001/${serverPath}`;
    window.open(`https://localhost:5001/${serverPath}`,"_blank");
  }


}
