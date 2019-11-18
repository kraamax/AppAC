import { Component } from '@angular/core';
import { JefeDepartamentoService } from './services/jefe-departamento.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  /*isDocente:boolean;
  constructor(private jefeDptoService:JefeDepartamentoService){
isDocente:jefeDptoService.getJefeDptoLoggedIn();

  }*/
}
