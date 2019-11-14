import { Component, OnInit } from '@angular/core';
import { Docente } from '../models/docente';
import { DocenteService } from '../services/docente.service';
import { MensajeModalComponent } from '../mensaje-modal/mensaje-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-docente-add',
  templateUrl: './docente-add.component.html',
  styleUrls: ['./docente-add.component.css']
})
export class DocenteAddComponent implements OnInit {
    docente: Docente;

    constructor(private docenteService: DocenteService, private modalService: NgbModal) {
    
    }

    ngOnInit() {
        this.docente = { nombres:'', apellidos:'', idDocente:null, sexo:"",email:'', telefono:'' };
  }

    add()
    {

        if (this.docente.nombres == '' || this.docente.apellidos == '' || this.docente.sexo == '' || this.docente.email == '' || this.docente.telefono == '' ||  this.docente.idDocente == null) {
            var mesage = this.modalService.open(MensajeModalComponent);
            mesage.componentInstance.titulo = "Atencion";
            mesage.componentInstance.body = "Rellene los campos";



        } else {
            console.log(this.docente);
            this.docenteService.addDocente(this.docente)
                .subscribe(rest=>{
                    this.docente = { nombres:'', apellidos:'', idDocente:null, sexo:"",email:'', telefono:'' };

                });
         
        }

    }
}
