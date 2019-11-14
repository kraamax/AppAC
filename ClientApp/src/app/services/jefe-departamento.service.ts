import { Injectable, Inject } from "@angular/core";


import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MensajeModalComponent } from "../mensaje-modal/mensaje-modal.component";
import { JefeDepartamento } from "../models/jefe-departamento";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class JefeDepartamentoService {
  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string,
    private modalService: NgbModal
  ) {}

  addJefeDpto(jefeDepartamento: JefeDepartamento): Observable<JefeDepartamento> {
    return this.http
      .post<JefeDepartamento>(this.baseUrl + "api/jefeDepartamento", jefeDepartamento, httpOptions)
      .pipe(
        tap((newJefeDepartamento: JefeDepartamento) =>
          this.log(`Nuevo Jefe Departamento agregado w/ id=${newJefeDepartamento.idJefeDpto}`)
        ),
        catchError(this.handleError<JefeDepartamento>("addJefeDepartamento"))
      );
  }

  getAll(): Observable<JefeDepartamento[]> {
    return this.http.get<JefeDepartamento[]>(this.baseUrl + "api/jefeDepartamento").pipe(
      tap(_ => console.log("Se Consulta la información")),
      catchError(this.handleError<JefeDepartamento[]>("getAll", []))
    );
  }
  get(id: number): Observable<JefeDepartamento> {
    const url = `${this.baseUrl + "api/jefeDepartamento"}/${id}`;
    return this.http.get<JefeDepartamento>(url).pipe(
      tap(_ => console.log(`Consultado JefeDepartamento id=${id}`)),
      //catchError(this.handleError<Docente>(`getDocente id=${id}`))
      catchError(err => {
        this.log(`El jefe Departamento id=${id} no fue encontrado`);
       return of(undefined);
        })

    );
  }
  update(jefeDepartamento: JefeDepartamento): Observable<any> {
    const url = `${this.baseUrl + "api/jefeDepartamento"}/${jefeDepartamento.idJefeDpto}`;
    return this.http.put(url, jefeDepartamento, httpOptions).pipe(
      tap(_ => this.log(`actualizado jefe Departamento id=${jefeDepartamento.idJefeDpto}`)),
      catchError(this.handleError<any>("JefeDepartamentoUpdate"))
    );
  }
  delete(jefeDepartamento: JefeDepartamento | number): Observable<JefeDepartamento> {
    const id = typeof jefeDepartamento === "number" ? jefeDepartamento : jefeDepartamento.idJefeDpto;
    const url = `${this.baseUrl + "api/jefeDepartamento"}/${id}`;

    return this.http.delete<JefeDepartamento>(url, httpOptions).pipe(
      tap(_ => this.log(`Eliminado Jefe Departamento id=${id}`)),
      catchError(this.handleError<JefeDepartamento>("deleteJefeDepartamento"))
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
