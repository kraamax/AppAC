import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/docente.service';
import { Docente } from '../models/docente';

@Component({
  selector: 'app-docente-list',
  templateUrl: './docente-list.component.html',
  styleUrls: ['./docente-list.component.css']
})
export class DocenteListComponent implements OnInit {

  docentes:Docente[];
  constructor(private docenteService:DocenteService) { }

  ngOnInit() {
    this.getDocentes();

  }

  getDocentes(){

this.docenteService.getAll().subscribe(docentes=>this.docentes=docentes);

  }
}
