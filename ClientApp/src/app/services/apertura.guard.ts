import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable, of, observable, Subject } from "rxjs";
import {map} from 'rxjs/operators';
import { AperturaService } from "./apertura.service";
import { isUndefined } from "util";

@Injectable({
  providedIn: "root"
})
export class AperturaGuard implements CanActivate {
 
  fecha: string;
   respuesta=new Subject<boolean>();
   respuesta2= new Observable<boolean>();
  constructor(private aperturaService: AperturaService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    
   
   this.validarPlazoActivacionDocente();
    return this.respuesta.asObservable().pipe(rest=>{
      return rest;
    });
  }
  validarPlazoActivacionDocente() {
    this.fecha =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();
    var currentFecha = new Date(this.fecha);
    this.aperturaService.getCurrentApertura().subscribe(rest => {
      if (isUndefined(rest)) {
        alert(
          "No se han establecidos fechas para la habilitación del modulo"
        );
        this.respuesta.next(false);
      } else {
        if (
          currentFecha.getTime() >= new Date(rest.fechaInicio).getTime() &&
          currentFecha.getTime() <=  new Date(rest.fechaFin).getTime()
        ) {
          this.respuesta.next(true);
        } else {
          alert(
            "solo puede ingresar a la modulo entre el " +
              rest.fechaInicio +
              " y el " +
              rest.fechaFin
          );
          this.respuesta.next(false);
        }
      }
    });
  }
}
