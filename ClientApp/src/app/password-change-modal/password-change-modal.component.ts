import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocenteService } from '../services/docente.service';
import { JefeDepartamentoService } from '../services/jefe-departamento.service';
import { Docente } from '../models/docente';
import { JefeDepartamento } from '../models/jefe-departamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change-modal',
  templateUrl: './password-change-modal.component.html',
  styleUrls: ['./password-change-modal.component.css']
})
export class PasswordChangeModalComponent implements OnInit {

  isDocente:boolean;
  isJefeDpto:boolean;
  docente:Docente;
  jefeDpto:JefeDepartamento;
  constructor(
    public activeModal:NgbActiveModal,
    private docenteService:DocenteService,
    private jefeDptoService:JefeDepartamentoService,
    private router:Router

    ){}
  
  ngOnInit() {
  this.isDocente=this.docenteService.getDocenteLoggedIn();
  this.isJefeDpto=this.jefeDptoService.getJefeDptoLoggedIn();
  }
  getDocente(){
    this.docenteService.isDocente.subscribe(resp=>{

      this.isDocente=resp;
      console.log(this.isDocente);
      if(this.isDocente==true){
        this.docente=this.docenteService.getDocenteLS();
      }
    });
  }
  getJefeDpto(){
    this.jefeDptoService.isJefeDpto.subscribe(resp=>{

      this.isJefeDpto=resp;
      console.log(this.isJefeDpto);
      if(this.isJefeDpto==true){
        this.jefeDpto=this.jefeDptoService.getJefeLS();
      }
    });
  }
  update(){
    if(this.isDocente==true){
      this.docente=this.docenteService.getDocenteLS();
      var contraseña=(document.getElementById("newPass") as HTMLInputElement).value;
      var confimarContraseña=(document.getElementById("confirmPass") as HTMLInputElement).value;
      if(contraseña==confimarContraseña){
      this.docente.password=(document.getElementById("newPass") as HTMLInputElement).value;
      this.docenteService.update(this.docente).subscribe(rest=>
        {
          this.activeModal.dismiss();
        });
      }else{
        alert("Las contraseñas no coinciden");
      }
    }else{
       if(this.isJefeDpto==true){
        var contraseña=(document.getElementById("newPass") as HTMLInputElement).value;
        var confimarContraseña=(document.getElementById("confirmPass") as HTMLInputElement).value;
        if(contraseña==confimarContraseña){
        this.jefeDpto=this.jefeDptoService.getJefeLS();
        this.jefeDpto.password=(document.getElementById("newPass") as HTMLInputElement).value;
        this.jefeDptoService.update(this.jefeDpto).subscribe(rest=>{
     
          this.activeModal.dismiss();
        })
      }else{
        alert("Las contraseñas no coinciden");
      }
      }
    }
  }
}
