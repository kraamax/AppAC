import { Injectable,Inject } from '@angular/core';
import { Actividad } from '../models/actividad';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MensajeModalComponent } from '../mensaje-modal/mensaje-modal.component';

const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl:string,private modalService: NgbModal) { }

  addActividad (actividad: Actividad): Observable<Actividad> {
    return this.http.post<Actividad>(this.baseUrl+'api/actividad', actividad, httpOptions).pipe(
    tap((newActividad: Actividad) => this.log(`Nueva actividad agregada w/ id=${newActividad.idActividad}`)),
    catchError(this.handleError<Actividad>('addActividad'))
    );
    }

  getAll(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.baseUrl + 'api/actividad').pipe(
      tap(_ => console.log('Se Consulta la información')),
      catchError(this.handleError<Actividad[]>('getAll', []))
    );
}
get(id: number): Observable<Actividad>
{
const url = `${this.baseUrl + 'api/actividad'}/${id}`;
return this.http.get<Actividad>(url).pipe(
tap(_ => console.log(`Actividad consultada id=${id}`)),
catchError(this.handleError<Actividad>(`getActividad id=${id}`))
);
}
getActividadesDocente(idDocente:number): Observable<Actividad[]> {
  const url = `${this.baseUrl + 'api/actividad'}/Docente=${idDocente}`;
  return this.http.get<Actividad[]>(url).pipe(
    tap(_ => console.log('Se Consulta la información')),
    catchError(this.handleError<Actividad[]>('getAll', []))
  );
}
getActividadesByDpto(idDpto:number): Observable<Actividad[]> {
  const url = `${this.baseUrl + 'api/actividad'}/departamento=${idDpto}`;
  return this.http.get<Actividad[]>(url).pipe(
    tap(_ => console.log('Se Consulta la información')),
    catchError(this.handleError<Actividad[]>('getAll', []))
  );
}
update (actividad: Actividad): Observable<any> {
  const url = `${this.baseUrl + 'api/actividad'}/${actividad.idActividad}`;
  return this.http.put(url, actividad, httpOptions).pipe(
  tap(_ => console.log(`Actividad actualizada id=${actividad.idActividad}`)),
  catchError(this.handleError<any>('ActividadUpdate'))
  );
  }
  delete (actividad: Actividad | number): Observable<Actividad> {
    const id = typeof actividad === 'number' ? actividad : actividad.idActividad;
    const url =  `${this.baseUrl + 'api/actividad'}/${id}`;
    
    return this.http.delete<Actividad>(url, httpOptions).pipe(
    tap(_ => this.log(`Actividad eliminada id=${id}`)),
    catchError(this.handleError<Actividad>('deleteActividad'))
    );
    }
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
  console.error(error);
  this.log(`${operation} failed: ${error.message}`);
  return of(result as T);
  };
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    var mesage =this.modalService.open(MensajeModalComponent);
    mesage.componentInstance.titulo="ClienteService:";
    mesage.componentInstance.body=` ${message}`;
}
}