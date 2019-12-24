import { Component, OnInit } from "@angular/core";
import { Docente } from "../models/docente";
import { DocenteService } from "../services/docente.service";
import { MensajeModalComponent } from "../mensaje-modal/mensaje-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { JefeDepartamentoService } from "../services/jefe-departamento.service";
import { JefeDepartamento } from "../models/jefe-departamento";

@Component({
  selector: "app-docente-add",
  templateUrl: "./docente-add.component.html",
  styleUrls: ["./docente-add.component.css"]
})
export class DocenteAddComponent implements OnInit {
  docente: Docente;
  jefeDpto:JefeDepartamento;

  constructor(
    private docenteService: DocenteService,
    private modalService: NgbModal,
    private jefeDptoService:JefeDepartamentoService
  ) {}

  ngOnInit() {
    this.getJefeDpto();
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
    
  }
  getJefeDpto(){
    this.jefeDpto=this.jefeDptoService.getJefeLS();
    console.log(this.jefeDpto);
  }

  add() {
    if (
      this.docente.nombres == "" ||
      this.docente.apellidos == "" ||
      this.docente.sexo == "" ||
      this.docente.email == "" ||
      this.docente.telefono == "" ||
      this.docente.idDocente == null
    ) {
      var mesage = this.modalService.open(MensajeModalComponent);
      mesage.componentInstance.titulo = "Atencion";
      mesage.componentInstance.body = "Rellene los campos";
    } else {
     
      this.docente.departamento=this.jefeDpto.departamento;
      console.log(this.docente);
      this.docenteService.addDocente(this.docente).subscribe(rest => {
        this.docente = {
          nombres: "",
          apellidos: "",
          idDocente: null,
          sexo: "",
          email: "",
          telefono: "",
          password:"",
          usuario:"",
          departamento:null
        };
        this.docente=new Docente();
      });
    }
  }
}
