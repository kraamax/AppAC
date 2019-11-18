import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Location } from "@angular/common";
import { DocenteService } from "../services/docente.service";
import { Docente } from "../models/docente";

@Component({
  selector: "app-docente-edit",
  templateUrl: "./docente-edit.component.html",
  styleUrls: ["./docente-edit.component.css"]
})
export class DocenteEditComponent implements OnInit {
  docente: Docente;
  constructor(
    private docenteService: DocenteService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.docente = {
      nombres: "",
      apellidos: "",
      idDocente: null,
      sexo: "",
      email: "",
      telefono: "",
      password: "",
      usuario: "",
      departamento:null
    };

    this.getDocente();
  }
  getDocente(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.docenteService.get(id).subscribe(docente => (this.docente = docente));
  }
  update(): void {
    this.docenteService.update(this.docente).subscribe(() => this.goBack());
  }
  delete(): void {
    this.docenteService.delete(this.docente).subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}
