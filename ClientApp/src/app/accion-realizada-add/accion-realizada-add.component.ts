import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccionService } from '../services/accion.service';
import { Accion } from '../models/accion';
import { promise } from 'protractor';
import { isPromiseAlike } from 'q';
import { resolve } from 'dns';

@Component({
  selector: 'app-accion-realizada-add',
  templateUrl: './accion-realizada-add.component.html',
  styleUrls: ['./accion-realizada-add.component.css']
})
export class AccionRealizadaAddComponent implements OnInit {

    @Input() idAccion: number;
    accion: Accion;
    constructor(public activeModal: NgbActiveModal, private accionService: AccionService,public modal: NgbModal,) { }

    ngOnInit() {
        this.accion = new Accion();
        this.getAccion();
  }
    getAccion(): void {

        this.accionService.getAccion(this.idAccion).subscribe(accion => {
            (this.accion = accion);
            console.log(this.accion);
        });
    }
    addAccionRealizada(){

        if(this.accion.accionRealizada.trim()==''){
            alert('digite una descripcion');
        }else{
            console.log(this.accion);
            this.accionService.update(this.accion).subscribe(rest=>{
           /* var promesa:Promise<Boolean> ;
             
             promesa.catch((resolve) => { resolve(true);

         
            });*/
            this.activeModal.close('success');

            
             
               
            
            });
            
            
        }
    }


}
