import { Component, OnInit } from "@angular/core";
import { Apertura } from "../models/apertura";
import { AperturaService } from "../services/apertura.service";
import { isUndefined } from "util";
import { DatePipe, formatDate } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MensajeModalComponent } from "../mensaje-modal/mensaje-modal.component";


@Component({
  selector: "app-plazo-activacion",
  templateUrl: "./plazo-activacion.component.html",
  styleUrls: ["./plazo-activacion.component.css"]
})
export class PlazoActivacionComponent implements OnInit {
  apertura: Apertura;
  fechaInicio:string;
  fechaFin:string;
  fecha:string;
  constructor(private aperturaService: AperturaService,public datepipe: DatePipe,private modalService:NgbModal) {}

  ngOnInit() {
    this.apertura = new Apertura();
    this.fechaFin="";
    this.fechaInicio="";
    this.getCurrentApertura();
    this.fecha=new Date().getFullYear() + "-" +(new Date().getMonth() +1) + "-" +new Date().getDate()  ;
  }

  getCurrentApertura(){

    this.aperturaService.getCurrentApertura().subscribe(rest=>{
      if(!isUndefined(rest)){
        this.apertura=rest;
        (document.getElementById("initialDate") as HTMLInputElement).value=(rest.fechaInicio);
        (document.getElementById("finalDate") as HTMLInputElement).value=(rest.fechaFin);
      }else{
        this.apertura=null;
      
      }
    })
  }
  deleteApertura(){
    if(this.apertura!=null){
      
    this.aperturaService.delete(this.apertura).subscribe(rest=>{
      this.getCurrentApertura();
      (document.getElementById("initialDate") as HTMLInputElement).value="";
      (document.getElementById("finalDate") as HTMLInputElement).value="";
      
    });
    }

  }
 
  addApertura() {
this.apertura=new Apertura();
    this.aperturaService.getCurrentApertura().subscribe(rest => {
      if (isUndefined(rest)) {
        var fechaInicio= new Date(this.fechaInicio);
        var fechaFin = new Date(this.fechaFin);
        //this.apertura.fechaInicio=fechaInicio.getFullYear() + "-" +(fechaInicio.getMonth() +1) + "-" +(fechaInicio.getDate()+1);
       // this.apertura.fechaFin=fechaFin.getFullYear() + "-" +(fechaFin.getMonth() +1) + "-" +(fechaFin.getDate()+1);
    this.apertura.fechaInicio=(document.getElementById("initialDate") as HTMLInputElement).value;
    this.apertura.fechaFin=(document.getElementById("finalDate") as HTMLInputElement).value;
        this.apertura.estado = "Activo";
        this.aperturaService.addApertura(this.apertura).subscribe();
      }else{
        this.log("Ya existe un plazo de apertura establecido");

      }
    });
  }
  updateApertura(){
    if((document.getElementById("initialDate") as HTMLInputElement).value=="" || (document.getElementById("finalDate") as HTMLInputElement).value==""){
      this.log("Seleccione las fechas de inicio y fin");
    }else{
    if(new Date((document.getElementById("initialDate") as HTMLInputElement).value).getTime()>new Date((document.getElementById("finalDate") as HTMLInputElement).value).getTime()){
this.log('La fecha de inicio no puede ser mayor a la fecha de fin');
    }else{
  
    if(this.apertura==null){
      this.apertura=new Apertura();
      this.apertura.fechaInicio=(document.getElementById("initialDate") as HTMLInputElement).value;
      this.apertura.fechaFin=(document.getElementById("finalDate") as HTMLInputElement).value;
      this.apertura.estado = "Activo";
      this.aperturaService.addApertura(this.apertura).subscribe(rest=>{
        this.getCurrentApertura();
      });
    }else{
      this.apertura.fechaInicio=(document.getElementById("initialDate") as HTMLInputElement).value;
      this.apertura.fechaFin=(document.getElementById("finalDate") as HTMLInputElement).value;
      this.apertura.estado = "Activo";
      this.aperturaService.update(this.apertura).subscribe();

    }
  }
}
  }
  private log(message: string) {
    var mesage =this.modalService.open(MensajeModalComponent);
    mesage.componentInstance.titulo="Atencion:";
    mesage.componentInstance.body=` ${message}`;
}
  escribir(){
    var fechaInicio= new Date(this.fechaInicio);
    var fechaFin = new Date(this.fechaFin);
    this.apertura.fechaInicio=fechaInicio.getFullYear() + "-" +(fechaInicio.getMonth() +1) + "-" +(fechaInicio.getDate()+1);
    this.apertura.fechaFin=fechaFin.getFullYear() + "-" +(fechaFin.getMonth() +1) + "-" +(fechaFin.getDate()+1);
    console.log(this.apertura);
    console.log(this.fecha);
  if(new Date(this.apertura.fechaInicio).getTime()==new Date(this.fecha).getTime())
  {
    console.log('funciona');

  }else{

    console.log(new Date(this.apertura.fechaInicio).getTime());
    console.log(new Date(this.fecha).getTime());
  }
  }
}
