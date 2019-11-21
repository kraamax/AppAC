import { Injectable, Inject } from "@angular/core";


import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MensajeModalComponent } from "../mensaje-modal/mensaje-modal.component";
import { PlanAcciones } from "../models/plan-acciones";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class PlanAccionesService {
  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string,
    private modalService: NgbModal
  ) {}

  addPlan(plan: PlanAcciones): Observable<PlanAcciones> {
    return this.http
      .post<PlanAcciones>(this.baseUrl + "api/planAcciones", plan, httpOptions)
      .pipe(
        tap((newPlanAcciones: PlanAcciones) =>
          this.log(`Nuevo Plan de acciones agregado w/ id=${newPlanAcciones.idPlanAcciones}`)
        ),
        catchError(this.handleError<PlanAcciones>("addPlan"))
      );
  }

  getAll(): Observable<PlanAcciones[]> {
    return this.http.get<PlanAcciones[]>(this.baseUrl + "api/planAcciones").pipe(
      tap(_ => console.log("Se Consulta la información")),
      catchError(this.handleError<PlanAcciones[]>("getAll", []))
    );
  }
  getPlanByActividad(idActividad: number): Observable<PlanAcciones> {
    const url = `${this.baseUrl + "api/planAcciones"}/actividad=${idActividad}`;
    return this.http.get<PlanAcciones>(url).pipe(
      tap(_ => console.log(`Consultado plan de acciones id=${idActividad}`)),
      //catchError(this.handleError<Docente>(`getDocente id=${id}`))
      catchError(err => {
        console.log(`El plan acciones id=${idActividad} no fue encontrado`);
       return of(undefined);
        })

    );
  }
  get(id: number): Observable<PlanAcciones> {
    const url = `${this.baseUrl + "api/planAcciones"}/${id}`;
    return this.http.get<PlanAcciones>(url).pipe(
      tap(_ => console.log(`Consultado plan de acciones id=${id}`)),
      //catchError(this.handleError<Docente>(`getDocente id=${id}`))
      catchError(err => {
        this.log(`El plan acciones id=${id} no fue encontrado`);
       return of(undefined);
        })

    );
  }
  update(planAcciones: PlanAcciones): Observable<any> {
    const url = `${this.baseUrl + "api/planAcciones"}/${planAcciones.idPlanAcciones}`;
    return this.http.put(url, planAcciones, httpOptions).pipe(
      tap(_ => this.log(`actualizado plan de acciones id=${planAcciones.idPlanAcciones}`)),
      catchError(this.handleError<any>("planAccionesUpdate"))
    );
  }
  delete(planAcciones: PlanAcciones | number): Observable<PlanAcciones> {
    const id = typeof planAcciones === "number" ? planAcciones : planAcciones.idPlanAcciones;
    const url = `${this.baseUrl + "api/planAcciones"}/${id}`;

    return this.http.delete<PlanAcciones>(url, httpOptions).pipe(
      tap(_ => this.log(`Eliminado plan de acciones id=${id}`)),
      catchError(this.handleError<PlanAcciones>("deletePlanAcciones"))
    );
  }
  private handleError<T>(operation = "operation", result?: T) {
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
