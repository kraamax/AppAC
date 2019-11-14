  
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mensaje-modal',
  templateUrl: './mensaje-modal.component.html',
  styleUrls: ['./mensaje-modal.component.css']
})
export class MensajeModalComponent implements OnInit {

  @Input()titulo:string;
  @Input()body:String;
    constructor(public activeModal:NgbActiveModal) { }
  
    ngOnInit() {
    }

}
