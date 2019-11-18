import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Location } from "@angular/common";
import { JefeDepartamentoService } from "../services/jefe-departamento.service";
import { JefeDepartamento } from "../models/jefe-departamento";
import { DepartamentoService } from "../services/departamento.service";
import { Departamento } from "../models/departamento";

@Component({
  selector: "app-jefe-edit",
  templateUrl: "./jefe-edit.component.html",
  styleUrls: ["./jefe-edit.component.css"]
})
export class JefeEditComponent implements OnInit {
  jefeDpto: JefeDepartamento;

  constructor(
    private jefeDptoService: JefeDepartamentoService,
    private route: ActivatedRoute,
    private location: Location,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit() {
    this.jefeDpto = {
      nombres: "",
      apellidos: "",
      idJefeDpto: null,
      sexo: "",
      email: "",
      telefono: "",
      departamento: null,
      usuario: "",
      password: ""
    };

    this.getJefeDpto();
  }
  getJefeDpto(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.jefeDptoService.get(id).subscribe(jefe => (this.jefeDpto = jefe));
  }
  update(): void {
    this.jefeDptoService.update(this.jefeDpto).subscribe(() => this.goBack());
  }
  delete(): void {
    this.jefeDptoService.delete(this.jefeDpto).subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}
