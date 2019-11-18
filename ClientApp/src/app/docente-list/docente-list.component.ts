import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/docente.service';
import { Docente } from '../models/docente';
import { JefeDepartamentoService } from '../services/jefe-departamento.service';
import { JefeDepartamento } from '../models/jefe-departamento';

@Component({
  selector: 'app-docente-list',
  templateUrl: './docente-list.component.html',
  styleUrls: ['./docente-list.component.css']
})
export class DocenteListComponent implements OnInit {

  docentes:Docente[];
  jefeDpto:JefeDepartamento;
  constructor(private docenteService:DocenteService, private jefeDptoService:JefeDepartamentoService) { }

  ngOnInit() {
    this.getJefeDpto();
    this.getDocentes();

  }
getJefeDpto(){
this.jefeDpto=this.jefeDptoService.getJefeLS();
}
  getDocentes(){
    console.log(this.jefeDpto.departamento.idDepartamento);

this.docenteService.getDocentesDepartamento(this.jefeDpto.departamento.idDepartamento).subscribe(docentes=>this.docentes=docentes);

  }
}
