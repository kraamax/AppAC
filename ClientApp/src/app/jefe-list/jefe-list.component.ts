import { Component, OnInit } from '@angular/core';
import { JefeDepartamento } from '../models/jefe-departamento';
import { JefeDepartamentoService } from '../services/jefe-departamento.service';

@Component({
  selector: 'app-jefe-list',
  templateUrl: './jefe-list.component.html',
  styleUrls: ['./jefe-list.component.css']
})
export class JefeListComponent implements OnInit {

  jefesDpto:JefeDepartamento[];
  constructor(private jefeDptoService:JefeDepartamentoService) { }

  ngOnInit() {
    this.getJefesDepartamento();
  }
  getJefesDepartamento(){
this.jefeDptoService.getAll().subscribe(jefes=>this.jefesDpto=jefes);

  }

}
