import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionRealizadaAddComponent } from './accion-realizada-add.component';

describe('AccionRealizadaAddComponent', () => {
  let component: AccionRealizadaAddComponent;
  let fixture: ComponentFixture<AccionRealizadaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionRealizadaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionRealizadaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
