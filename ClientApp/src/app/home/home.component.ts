import { Component } from '@angular/core';
import { DocenteService } from '../services/docente.service';
import { JefeDepartamentoService } from '../services/jefe-departamento.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private docenteService:DocenteService,private jefeDptoService:JefeDepartamentoService, private adminService:AdminService){
    this.docenteService.getDocenteLoggedIn();
this.jefeDptoService.getJefeDptoLoggedIn();
this.adminService.getAdminLoggedIn();
    
  }
}
