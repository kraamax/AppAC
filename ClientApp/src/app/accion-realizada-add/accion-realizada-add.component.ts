import { Component, OnInit, Input, Output } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AccionService } from "../services/accion.service";
import { Accion } from "../models/accion";

import { EventEmitter } from "@angular/core";
import { HttpEventType, HttpClient } from "@angular/common/http";
@Component({
  selector: "app-accion-realizada-add",
  templateUrl: "./accion-realizada-add.component.html",
  styleUrls: ["./accion-realizada-add.component.css"]
})
export class AccionRealizadaAddComponent implements OnInit {
  @Input() idAccion: number;

  accion: Accion;
  constructor(
    public activeModal: NgbActiveModal,
    private accionService: AccionService,
    public modal: NgbModal,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.accion = new Accion();
    this.getAccion();
  }
  getAccion(): void {
    this.accionService.getAccion(this.idAccion).subscribe(accion => {
      this.accion = accion;
      console.log(this.accion);
    });
  }
  addAccionRealizada() {
    if (this.accion.accionRealizada.trim() == "") {
      alert("digite una descripcion");
    } else {
      if (this.accion.evidencia == "") {
        alert("Adjunte una Evidencia");
      } else {
        console.log(this.accion);

        this.accionService.update(this.accion).subscribe(rest => {
          this.activeModal.close("success");
        });
      }
    }
  }

  public response: { dbPath: "" };

  public uploadFinished = event => {
    this.response = event;
    this.accion.evidencia = this.response.dbPath;
  };
}
