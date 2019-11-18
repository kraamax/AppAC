import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JefeDepartamentoService } from './jefe-departamento.service';

@Injectable({
  providedIn: 'root'
})
export class AuthJefeDptoGuard implements CanActivate {
  constructor(private jefeDptoService:JefeDepartamentoService,private router:Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.jefeDptoService.getJefeDptoLoggedIn()==false){
this.router.navigate(["/"]);

    }
 
    return this.jefeDptoService.getJefeDptoLoggedIn();

  }
  
}
