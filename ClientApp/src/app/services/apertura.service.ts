import { Injectable, Inject } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, observable, Subject } from "rxjs";
import { catchError, map, tap, take } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MensajeModalComponent } from "../mensaje-modal/mensaje-modal.component";
import { Apertura } from "../models/apertura";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
  })
export class AperturaService {
  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string,
    private modalService: NgbModal
  ) {}

  addApertura(apertura: Apertura): Observable<Apertura> {
    return this.http
      .post<Apertura>(
        this.baseUrl + "api/apertura",
        apertura,
        httpOptions
      )
      .pipe(
        tap((newApertura: Apertura) =>
          this.log(
            `Nueva apertura agregada `
          )
        ),
        catchError(this.handleError<Apertura>("addApertura"))
      );
  }


  get(id: number): Observable<Apertura> {
    const url = `${this.baseUrl + "api/apertura"}/${id}`;
    return this.http.get<Apertura>(url).pipe(
      tap(_ => console.log(`Consultado apertura id=${id}`)),
      catchError(err => {
    return of(undefined);
      })
    );
  }
  getCurrentApertura(): Observable<Apertura> {
    const url = `${this.baseUrl + "api/apertura"}/estado`;
    return this.http.get<Apertura>(url).pipe(
      tap(_ => console.log(`Consultado actual apertura`)),
      catchError(err => {
        return of(undefined);
      })
    );
  }
  update(apertura: Apertura): Observable<any> {
    const url = `${this.baseUrl + "api/apertura"}/${
      apertura.idApertura
    }`;
    return this.http.put(url, apertura, httpOptions).pipe(
      tap(_ =>
        this.log(
          `Apertura actualizada`
        )
      ),
      catchError(this.handleError<any>("AperturaUpdate"))
    );
  }
  delete(
    apertura: Apertura | number
  ): Observable<Apertura> {
    const id =
      typeof apertura === "number"
        ? apertura
        : apertura.idApertura;
    const url = `${this.baseUrl + "api/apertura"}/${id}`;

    return this.http.delete<Apertura>(url, httpOptions).pipe(
      tap(_ => this.log(`Apertura eliminada`)),
      catchError(this.handleError<Apertura>("deleteJefeDepartamento"))
    );
  }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
  private log(message: string) {
    var mesage = this.modalService.open(MensajeModalComponent);
    mesage.componentInstance.titulo = "ClienteService:";
    mesage.componentInstance.body = ` ${message}`;
  }
}
