import { Injectable, Inject } from "@angular/core";
import { Docente } from "../models/docente";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, observable, Subject } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MensajeModalComponent } from "../mensaje-modal/mensaje-modal.component";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class DocenteService {
  private isDocenteLoggedIn;
  isDocente = new Subject<boolean>();
  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string,
    private modalService: NgbModal
  ) {
    this.isDocenteLoggedIn=false;

  }

  addDocente(docente: Docente): Observable<Docente> {
    return this.http
      .post<Docente>(this.baseUrl + "api/docente", docente, httpOptions)
      .pipe(
        tap((newDocente: Docente) =>
          this.log(`Nuevo docente agregado w/ id=${newDocente.idDocente}`)
        ),
        catchError(this.handleError<Docente>("addDocente"))
      );
  }

  getAll(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.baseUrl + "api/docente").pipe(
      tap(_ => console.log("Se Consulta la información")),
      catchError(this.handleError<Docente[]>("getAll", []))
    );
  }
  getDocentesDepartamento(idDepartamento:number): Observable<Docente[]> {
    const url = `${this.baseUrl + "api/docente/Departamento="}${idDepartamento}`;
    return this.http.get<Docente[]>(url).pipe(
      tap(_ => console.log("Se Consulta la información")),
      catchError(this.handleError<Docente[]>("getAll", []))
    );
  }
  //doc={idDocente}/Dpto={idDpto}
  getDocenteDpto(idDocente: number, idDepartamento:number): Observable<Docente> {
    const url = `${this.baseUrl + "api/docente"}/doc=${idDocente}/dpto=${idDepartamento}`;
    return this.http.get<Docente>(url).pipe(
      tap(_ => console.log(`Consultado Docente id=${idDocente}`)),
      //catchError(this.handleError<Docente>(`getDocente id=${id}`))
      catchError(err => {
        this.log(`El docente id=${idDocente} no fue encontrado`);
       return of(undefined);
        })

    );
  }
  getDocenteByUser(user: string): Observable<Docente> {
    const url = `${this.baseUrl + "api/docente"}/user=${user}`;
    return this.http.get<Docente>(url).pipe(
      tap(_ => console.log(`Consultado Docente user=${user}`)),
      //catchError(this.handleError<Docente>(`getDocente id=${id}`))
      catchError(err => {
        this.log(`Usuario incorrecto`);
       return of(undefined);
        })

    );
  }
  get(id: number): Observable<Docente> {
    const url = `${this.baseUrl + "api/docente"}/${id}`;
    return this.http.get<Docente>(url).pipe(
      tap(_ => console.log(`Consultado Docente id=${id}`)),
      //catchError(this.handleError<Docente>(`getDocente id=${id}`))
      catchError(err => {
        this.log(`El docente id=${id} no fue encontrado`);
       return of(undefined);
        })

    );
  }
  update(docente: Docente): Observable<any> {
    const url = `${this.baseUrl + "api/docente"}/${docente.idDocente}`;
    return this.http.put(url, docente, httpOptions).pipe(
      tap(_ => this.log(`actualizado Docente id=${docente.idDocente}`)),
      catchError(this.handleError<any>("DocenteUpdate"))
    );
  }
  delete(docente: Docente | number): Observable<Docente> {
    const id = typeof docente === "number" ? docente : docente.idDocente;
    const url = `${this.baseUrl + "api/docente"}/${id}`;

    return this.http.delete<Docente>(url, httpOptions).pipe(
      tap(_ => this.log(`Eliminado docente id=${id}`)),
      catchError(this.handleError<Docente>("deleteDocente"))
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
  setDocenteLoggedIn() {
    this.isDocente.next(true);
    sessionStorage.setItem(
      "DocenteLoggedIn",
      JSON.stringify((this.isDocenteLoggedIn = true))
    );
  }
  getDocenteLoggedIn(): boolean {
    if (JSON.parse(sessionStorage.getItem("DocenteLoggedIn")) != null) {
      this.isDocente.next(JSON.parse(sessionStorage.getItem("DocenteLoggedIn")));

      return JSON.parse(sessionStorage.getItem("DocenteLoggedIn"));
    } else {
      this.isDocente.next(false);
      return false;
    }
  }
  addDocenteLS(docente: Docente) {
    sessionStorage.setItem("docente", JSON.stringify(docente));
  }
  getDocenteLS(): Docente {

    return JSON.parse(sessionStorage.getItem("docente"));
  }
  logoutDocente() {
    this.isDocente.next(false);
    sessionStorage.clear();
    
  }

}
