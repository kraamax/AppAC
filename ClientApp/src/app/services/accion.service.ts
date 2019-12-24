
import { Accion } from "../models/accion";
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MensajeModalComponent } from '../mensaje-modal/mensaje-modal.component';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: "root"
})
export class AccionService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private modalService: NgbModal) {}
  addAccion(accion: Accion) {
    let acciones: Accion[] = [];
    if (sessionStorage.getItem("acciones") != null) {
      acciones = JSON.parse(sessionStorage.getItem("acciones"));
    }
    acciones.push(accion);
    sessionStorage.setItem("acciones", JSON.stringify(acciones));
    this.log("Accion Agregada");
  }
  getAcciones(): Accion[] {
    if (sessionStorage.getItem("acciones") != null) {
      return JSON.parse(sessionStorage.getItem("acciones"));
    } else {
      return [];
    }
    }
    getAccion(id: number): Observable<Accion> {
        const url = `${this.baseUrl + 'api/accion'}/${id}`;
        return this.http.get<Accion>(url).pipe(
            tap(_ => console.log(`Accion consultada id=${id}`)),
            catchError(this.handleError<Accion>(`getAccion id=${id}`))
        );
    }
    update (accion: Accion): Observable<any> {
      const url = `${this.baseUrl + 'api/accion'}/${accion.idAccion}`;
      return this.http.put(url, accion, httpOptions).pipe(
      tap(_ => this.log(`Accion Guardada`)),
      catchError(this.handleError<any>('AccionUpdate'))
      );
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
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        var mesage = this.modalService.open(MensajeModalComponent);
        mesage.componentInstance.titulo = "ClienteService:";
        mesage.componentInstance.body = ` ${message}`;
    }
}
