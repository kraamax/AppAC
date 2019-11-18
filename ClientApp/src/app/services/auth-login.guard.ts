import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocenteService } from './docente.service';
import { JefeDepartamentoService } from './jefe-departamento.service';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {
  constructor(private docenteService:DocenteService, private jefeDptoService:JefeDepartamentoService,private adminService:AdminService, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.docenteService.getDocenteLoggedIn()==true || this.jefeDptoService.getJefeDptoLoggedIn()==true || this.adminService.getAdminLoggedIn()==true){
            this.router.navigate(['home']);
        return false;

      }else{

        return true;
      }
  
  }
  
}
