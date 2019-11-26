import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesRealizadasListComponent } from './acciones-realizadas-list.component';

describe('AccionesRealizadasListComponent', () => {
  let component: AccionesRealizadasListComponent;
  let fixture: ComponentFixture<AccionesRealizadasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionesRealizadasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionesRealizadasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
