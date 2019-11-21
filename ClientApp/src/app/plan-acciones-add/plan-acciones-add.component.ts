import { Component, OnInit } from "@angular/core";
import { ActividadService } from "../services/actividad.service";
import { DocenteService } from "../services/docente.service";
import { Actividad } from "../models/actividad";
import { Docente } from "../models/docente";
import { isUndefined } from "util";
import { AccionService } from "../services/accion.service";
import { PlanAccionesService } from "../services/plan-acciones.service";
import { Accion } from "../models/accion";
import { PlanAcciones } from "../models/plan-acciones";
import { Location } from "@angular/common";


@Component({
  selector: "app-plan-acciones-add",
  templateUrl: "./plan-acciones-add.component.html",
  styleUrls: ["./plan-acciones-add.component.css"]
})
export class PlanAccionesAddComponent implements OnInit {
  actividades: Actividad[];
  actividad: Actividad;
  docente: Docente;
  accion: Accion;
  acciones: Accion[];
  plan: PlanAcciones;
  yaExiste: boolean;
  constructor(
    private actividadService: ActividadService,
    private docenteService: DocenteService,
    private accionService: AccionService,
    private planService: PlanAccionesService,
    private location:Location
  ) {}

  ngOnInit() {
    this.accion = { idAccion: null, descripcion: "" };
    this.getDocente();
    this.getActividades();
  }
  getDocente() {
    this.docente = this.docenteService.getDocenteLS();
  }
  getActividades() {
    this.actividadService
      .getActividadesDocente(this.docente.idDocente)
      .subscribe(actividades => {
        this.actividades = actividades;
        console.log(this.actividades);
        if (this.actividades.length <= 0) {
          alert("El docente no tiene actividades asignadas");
        }
      });
  }
  /* ExistePlanAcciones(): boolean {
    var id = Number.parseInt(
      (document.getElementById("actividades") as HTMLInputElement).value
    );

    this.planService.getPlanByActividad(id).subscribe(plan => {
      this.plan = plan;
      if (isUndefined(this.plan)) {
        this.yaExiste = false;
      } else {
        this.yaExiste = true;
      }
      console.log(this.yaExiste.valueOf());
    });
    return this.yaExiste.valueOf();
  }*/
  getActividad() {
    var id = Number.parseInt(
      (document.getElementById("actividades") as HTMLInputElement).value
    );
    this.actividadService.get(id).subscribe(actividad => {
      this.actividad = actividad;
    });
  }
  addAccion() {
    if (!isUndefined(this.actividad)) {
      var id = Number.parseInt(
        (document.getElementById("actividades") as HTMLInputElement).value
      );

      this.planService.getPlanByActividad(id).subscribe(plan => {
        this.plan = plan;
        console.log(this.plan);
        if (isUndefined(this.plan)) {
          if (this.accion.descripcion.trim() != "") {
            this.accion.idAccion = 0;
            this.accionService.addAccion(this.accion);
            this.accion.descripcion="";
            this.acciones = this.accionService.getAcciones();
          } else {
            alert("Digite una descripcion");
          }
        } else {
          alert("Ya existe un plan de acciones para esta actividad");
        }
      });
    } else {
      alert("Seleccione una actividad");
    }
  }

  validarAddPlan() {
    if (!isUndefined(this.actividad)) {
      var id = Number.parseInt(
        (document.getElementById("actividades") as HTMLInputElement).value
      );

      this.planService.getPlanByActividad(id).subscribe(plan => {
        this.plan = plan;
        console.log(this.plan);
        if (isUndefined(this.plan)) {
          this.addPlan();
         
        } else {
          alert("Ya existe un plan de acciones para esta actividad");
        }
      });
    } else {
      alert("Seleccione una actividad");
    }
  }
  addPlan() {
    this.getAcciones();
    if (this.acciones.length <= 0) {
      alert("Debe agregar las acciones a realizar");
    } else {
      this.plan = new PlanAcciones();
      this.plan.idPlanAcciones = 0;
      this.plan.acciones = this.acciones;
      this.plan.actividad = this.actividad;
      var fecha =
        new Date().getMonth() +
        1 +
        "/" +
        new Date().getDate() +
        "/" +
        new Date().getFullYear();
      this.plan.fecha = new Date(fecha);
      console.log(JSON.stringify(this.plan));
      this.planService.addPlan(this.plan).subscribe(rest => {
        this.actividad.estado = "Planeada";
        this.actividadService.update(this.actividad).subscribe();
        this.accionService.eliminarAcciones();
        this.getAcciones();
      });
    }
  }
  getAcciones() {
    this.acciones = this.accionService.getAcciones();
  }
  eliminarAccion(accion: Accion) {
    this.accionService.deleteAccion(accion);
    this.getAcciones();
  }
  goBack(): void {
    this.location.back();
  }
}