import { Component, OnInit } from "@angular/core";
import { JefeDepartamento } from "../models/jefe-departamento";
import { JefeDepartamentoService } from "../services/jefe-departamento.service";
import { Departamento } from "../models/departamento";
import { DepartamentoService } from "../services/departamento.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MensajeModalComponent } from "../mensaje-modal/mensaje-modal.component";

@Component({
  selector: "app-jefe-add",
  templateUrl: "./jefe-add.component.html",
  styleUrls: ["./jefe-add.component.css"]
})
export class JefeAddComponent implements OnInit {
  jefeDpto: JefeDepartamento;
  departamento: Departamento;
  departamentos: Departamento[];
  haveDepartamento: boolean;
  constructor(
    private jefeDptoService: JefeDepartamentoService,
    private departamentoService: DepartamentoService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.departamento = { idDepartamento: 0, nombreDepartamento: "" };
    this.jefeDpto = {
      idJefeDpto: null,
      nombres: "",
      apellidos: "",
      departamento: this.departamento,
      sexo: "",
      email: "",
      telefono: ""
    };
    this.getDepartamentos();
    this.haveDepartamento = false;
  }
  add() {
    if (
      this.jefeDpto.nombres == "" ||
      this.jefeDpto.apellidos == "" ||
      this.jefeDpto.sexo == "" ||
      this.jefeDpto.email == "" ||
      this.jefeDpto.telefono == "" ||
      this.jefeDpto.idJefeDpto == null
    ) {
      this.log("Atencíon", "Rellene los campos");
    } else {
   
      if (this.haveDepartamento) {
        this.jefeDpto.departamento = this.departamento;
        this.jefeDptoService.addJefeDpto(this.jefeDpto).subscribe(rest=>{
          this.jefeDpto = {
            idJefeDpto: null,
            nombres: "",
            apellidos: "",
            departamento: this.departamento,
            sexo: "",
            email: "",
            telefono: ""
          };

        });
      } else {
        this.log("Atencion", "Seleccione una facultad");
      }
    }
  }

  getDepartamentos() {
    this.departamentoService
      .getAll()
      .subscribe(departamentos => (this.departamentos = departamentos));
  }
  getDepartamento() {
    var num1 = (document.getElementById("departamentos") as HTMLInputElement)
      .value;
    if (num1 != "Seleccione...") {
      this.departamentoService.get(parseInt(num1)).subscribe(departamento => {
        this.departamento = departamento;
        this.haveDepartamento = true;
      });
    }
  }
  log(header: string, body: string) {
    var mesage = this.modalService.open(MensajeModalComponent);
    mesage.componentInstance.titulo = header;
    mesage.componentInstance.body = body;
  }
}
