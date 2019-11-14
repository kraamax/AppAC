import { Component, OnInit } from "@angular/core";
import { Actividad } from "../models/actividad";
import { Docente } from "../models/docente";
import { DocenteService } from "../services/docente.service";
import { DatePipe } from "@angular/common";
import { isUndefined } from "util";
import { ActividadService } from "../services/actividad.service";
import { get } from "selenium-webdriver/http";
import { MensajeModalComponent } from "../mensaje-modal/mensaje-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-complementary-activity-add",
  templateUrl: "./complementary-activity-add.component.html",
  styleUrls: ["./complementary-activity-add.component.css"]
})
export class ComplementaryActivityAddComponent implements OnInit {
  actividad: Actividad;
  actividades: Actividad[];
  docente: Docente;
  haveDocente: boolean;
  constructor(
    private docenteService: DocenteService,
    private actividadService: ActividadService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.docente = {
      nombres: "",
      apellidos: "",
      idDocente: null,
      sexo: "",
      email: "",
      telefono: ""
    };
    this.haveDocente = false;
    this.actividad = {
      idActividad: 0,
      nombreActivity: "",
      docente: this.docente,
      horasAsignadas: null,
      fechaAsignacion: null
    };
  }
  addActividad() {
    if (this.actividad.horasAsignadas != null && this.actividad.nombreActivity != null) {
      if (this.haveDocente) {
        this.actividad.docente = this.docente;
        this.actividadService.addActividad(this.actividad).subscribe(rest => {
          this.getActividadesDocente(this.docente.idDocente);});
      } else {
        this.log("Atencion", "Debe buscar un docente");
      }
    } else {
      this.log("Atencíon", "Rellene los campos");
    }
  }
  getActividadesDocente(id: number) {
    this.actividadService
      .getActividadesDocente(id)
      .subscribe(actividades => (this.actividades = actividades));
  }
  Eliminar(id: number) {
    this.actividadService.delete(id).subscribe(rest => {
      this.getActividadesDocente(this.docente.idDocente);
    });
  }
  getDocente() {
    if (this.docente.idDocente != null) {
      var id = Number.parseInt(
        (document.getElementById("identificacion") as HTMLInputElement).value
      );
      this.docenteService.get(id).subscribe(docente => {
        this.docente = docente;
        if (isUndefined(this.docente)) {
          this.docente = {
            nombres: "",
            apellidos: "",
            idDocente: null,
            sexo: "",
            email: "",
            telefono: ""
          };
          this.haveDocente = false;
        } else {
          this.getActividadesDocente(this.docente.idDocente);
          this.haveDocente = true;
        }
      });
    }
  }
  log(header: string, body: string) {
    var mesage = this.modalService.open(MensajeModalComponent);
    mesage.componentInstance.titulo = header;
    mesage.componentInstance.body = body;
  }
}
