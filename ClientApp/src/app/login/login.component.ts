import { Component, OnInit } from "@angular/core";
import { Docente } from "../models/docente";
import { DocenteService } from "../services/docente.service";
import { first, take } from "rxjs/operators";
import { Router } from "@angular/router";
import { isUndefined } from "util";
import { JefeDepartamento } from "../models/jefe-departamento";
import { JefeDepartamentoService } from "../services/jefe-departamento.service";
import { AdminService } from "../services/admin.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  docente: Docente;
  jefeDpto: JefeDepartamento;

  constructor(
    private docenteService: DocenteService,
    private router: Router,
    private jefeDptoService: JefeDepartamentoService,
    private adminService:AdminService
  ) {}

  ngOnInit() {}

  validarLogin() {
    var tipoCargo = (document.getElementById("tipoCargo") as HTMLInputElement)
      .value;
    if (tipoCargo == "docente") {
      this.ValidarLoginDocente();
    } else {
      if (tipoCargo == "jefeDpto") {
        this.validarLoginJefeDpto();
      }else{
        if(tipoCargo=="admin"){
          this.validarLoginAdmin();
        }
      }
    }
  }
  ValidarLoginDocente() {
    var user = (document.getElementById("user") as HTMLInputElement).value;
    this.docenteService.getDocenteByUser(user).subscribe(docente => {
      this.docente = docente;
      if (!isUndefined(this.docente)) {
        this.validarDocente(this.docente.usuario, this.docente.password);
        this.docenteService.addDocenteLS(this.docente);
      }
    });
  }
  validarLoginJefeDpto() {
    var user = (document.getElementById("user") as HTMLInputElement).value;
    this.jefeDptoService.getJefeDptoByUser(user).subscribe(jefe => {
      this.jefeDpto = jefe;
      if (!isUndefined(this.jefeDpto)) {
        this.validarJefeDpto(this.jefeDpto.usuario, this.jefeDpto.password);
        this.jefeDptoService.addJefeLS(this.jefeDpto);
      }
    });
  }
  validarJefeDpto(usuario: string, password: string) {
    var user = (document.getElementById("user") as HTMLInputElement).value;
    var pass = (document.getElementById("password") as HTMLInputElement).value;
    if (user == usuario && pass == password) {
      this.jefeDptoService.setJefeDptoLoggedIn();
      this.router.navigate(["ActivityAdd"]);
    } else {
      alert("Contraseña incorrecta");
    }
  }
  validarDocente(usuario: string, password: string) {
    var user = (document.getElementById("user") as HTMLInputElement).value;
    var pass = (document.getElementById("password") as HTMLInputElement).value;
    if (usuario == user && password == pass) {
      console.log("acceso aceptado");
      this.docenteService.setDocenteLoggedIn();
      this.router.navigate(["home"]);
    } else {
      alert("Contraseña incorrecta");
    }
  }
  validarLoginAdmin(){

    var user = (document.getElementById("user") as HTMLInputElement).value;
    var pass = (document.getElementById("password") as HTMLInputElement).value;
    if(user=="Admin" && pass=="123"){
      this.adminService.setAdminLoggedIn();
      this.router.navigate(["home"]);
    }else{
      alert("Usuario y/o Contraseña incorrectos");
    }
  }
}
