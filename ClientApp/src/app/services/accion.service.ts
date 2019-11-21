import { Injectable } from "@angular/core";
import { Accion } from "../models/accion";

@Injectable({
  providedIn: "root"
})
export class AccionService {
  constructor() {}
  addAccion(accion: Accion) {
    let acciones: Accion[] = [];
    if (sessionStorage.getItem("acciones") != null) {
      acciones = JSON.parse(sessionStorage.getItem("acciones"));
    }
    acciones.push(accion);
    sessionStorage.setItem("acciones", JSON.stringify(acciones));
    alert("Accion Agregada");
  }
  getAcciones(): Accion[] {
    if (sessionStorage.getItem("acciones") != null) {
      return JSON.parse(sessionStorage.getItem("acciones"));
    } else {
      return [];
    }
  }
  deleteAccion(accion: Accion) {
    let acciones: Accion[] = JSON.parse(sessionStorage.getItem("acciones"));
    var i, j;
    i = 0;

    acciones.forEach(element => {
      if (JSON.stringify(element) == JSON.stringify(accion)) {
        +acciones.splice(i, 1);
      } else {
        i++;
      }
    });
    sessionStorage.setItem("acciones", JSON.stringify(acciones));
  }
  eliminarAcciones(){
    sessionStorage.removeItem('acciones');
  }
}
