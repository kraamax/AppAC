import { Component, OnInit } from '@angular/core';
import { Actividad } from '../models/actividad';
import { ActividadService } from '../services/actividad.service';
import { JefeDepartamentoService } from '../services/jefe-departamento.service';
import { JefeDepartamento } from '../models/jefe-departamento';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  actividades:Actividad[];
  jefeDpto:JefeDepartamento;
  fecha:Date;
  constructor(private actividadService:ActividadService, private jefeDptoService:JefeDepartamentoService) { }

  ngOnInit() {
    this.getAllActividades();

  }
  getAllActividades(){

    this.jefeDpto=this.jefeDptoService.getJefeLS();
this.actividadService.getActividadesByDpto(this.jefeDpto.departamento.idDepartamento).subscribe(actividades=>this.actividades=actividades);

  }
  myFunction() {
    // Declare variables 
    var input, filter, table, tr, td, i, txtValue, tipoFiltro;
    input = document.getElementById("filtro");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    tipoFiltro=(document.getElementById("opFiltro") as HTMLInputElement).value;
    console.log(tipoFiltro);
   if(tipoFiltro=="identificacion" || tipoFiltro=="actividad"){
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      if(tipoFiltro=="identificacion"){
        td = tr[i].getElementsByTagName("td")[0];
      }else{
        if(tipoFiltro=="actividad"){
        td = tr[i].getElementsByTagName("td")[3];
      }

      }
     
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }else{
    alert("Seleccione el atributo por el que desea filtrar");
  
  }
  }

  


}
