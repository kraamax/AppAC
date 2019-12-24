import { Component, OnInit, Inject } from '@angular/core';
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
import { AperturaService } from '../services/apertura.service';

@Component({
  selector: 'app-acciones-plist',
  templateUrl: './acciones-plist.component.html',
  styleUrls: ['./acciones-plist.component.css']
})
export class AccionesPListComponent implements OnInit {
  plan:PlanAcciones;
  docente:Docente;
  actividad:Actividad;
  progreso:string;
  porcentajeDesarrollo:number;
  fecha:string;
  constructor(
    private planService:PlanAccionesService,
    private route: ActivatedRoute,
    private location:Location,
    private actividadService:ActividadService,
    private docenteService:DocenteService,
    private modalService: NgbModal,
    private router:Router,
    private aperturaService:AperturaService,
    @Inject('BASE_URL') private baseUrl:string
    
  ) { }

  ngOnInit() {
    this.actividad=new Actividad();
    this.plan=new PlanAcciones();
    this.plan.actividad=this.actividad;
    this.getPlan();
    this.progreso='';
    this.porcentajeDesarrollo=0;
    this.fecha=new Date().getFullYear() + "-" +(new Date().getMonth() +1) + "-" +new Date().getDate()  ;
    
  }
  getPlan(): void {
    var numeroAccionesPlaneadas=0;
    var numeroAccionesRealizadas=0;
    const id = +this.route.snapshot.paramMap.get("idPlan");
    this.planService.get(id).subscribe(plan => {
      (this.plan = plan);
      this.plan.acciones.forEach(element => {
        numeroAccionesPlaneadas++;
        if(element.accionRealizada.trim()!=''){
          numeroAccionesRealizadas++;
        }
      });
   this.verificarEstadoActividad(numeroAccionesPlaneadas,numeroAccionesRealizadas);

      this.docente=this.docenteService.getDocenteLS();
      if(this.docente.idDocente!=this.plan.actividad.docente.idDocente){
        this.goBack();
      }
    });
  }
  verificarEstadoActividad(numeroAccionesPlaneadas:number, numeroAccionesRealizadas:number){
    this.porcentajeDesarrollo=this.calcularPorcentajeDesarrollo(numeroAccionesPlaneadas,numeroAccionesRealizadas);
    this.progreso=this.porcentajeDesarrollo.toPrecision(3)+"%";
    if(this.plan.actividad.estado=="Planeada"){
      if(this.porcentajeDesarrollo>0){
        this.plan.actividad.estado="En Ejecución";
        this.actividadService.update(this.plan.actividad).subscribe();
      }
    }
    this.aperturaService.getCurrentApertura().subscribe(rest=>{
      if(new Date(this.fecha).getTime()> new Date(rest.fechaFin).getTime()){
        this.finalizarProceso();
      }
    })


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
    window.open(this.baseUrl+`${serverPath}`,"_blank");
  }
 calcularPorcentajeDesarrollo(numeroAccionesPlaneadas:number, numeroAccionesRealizadas:number):number{
    var porcentajeDesarrolloPorAccion=100/numeroAccionesPlaneadas;
    var porcentajeDesarrolloTotal=porcentajeDesarrolloPorAccion*numeroAccionesRealizadas;
    return porcentajeDesarrolloTotal;

  }
  finalizarProceso(){

    if(this.plan.actividad.estado=='En Ejecución' || this.plan.actividad.estado=="Planeada"){
      if(this.porcentajeDesarrollo>=70){
        this.plan.actividad.estado="Terminada";
        this.actividadService.update(this.plan.actividad).subscribe();
      }else{
        this.plan.actividad.estado="No Terminada";
        this.actividadService.update(this.plan.actividad).subscribe();

      }
  }
}
finalizar(){
  var mensaje = confirm("¿Seguro que desea finalizar el proceso?(Si acepta no podrá realizar mas modificaciones)");
  //Detectamos si el usuario acepto el mensaje
  if (mensaje) {
   this.finalizarProceso();
    this.goBack();
  }
  //Detectamos si el usuario denegó el mensaje
  else {

  }

}

}
