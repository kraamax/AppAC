import { Component, IterableDiffers } from "@angular/core";
import { JefeDepartamentoService } from "../services/jefe-departamento.service";
import { DocenteService } from "../services/docente.service";
import { AdminService } from "../services/admin.service";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"]
})
export class NavMenuComponent {
  isExpanded = false;
  isJefeDpto: boolean;
  isDocente: boolean;
  isAdmin:boolean;
  constructor(
    private jefeDptoSevice: JefeDepartamentoService,
    private docenteService: DocenteService,
    private adminService:AdminService
  ) {

    this.jefeDptoSevice.isJefeDpto.subscribe(
      isJefe => {
        
        (this.isJefeDpto = isJefe)
      }
    );
    this.docenteService.isDocente.subscribe(
      isDocente => (this.isDocente = isDocente)
    );
    this.adminService.isAdmin.subscribe(
      isAdmin=>(this.isAdmin=isAdmin)
    );

  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  logout() {
    this.jefeDptoSevice.logoutJefe();

    this.docenteService.logoutDocente();
    this.adminService.logoutAdmin();
  }
}
