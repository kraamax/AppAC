import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionPlaneadaAddComponent } from './accion-planeada-add.component';

describe('AccionPlaneadaAddComponent', () => {
  let component: AccionPlaneadaAddComponent;
  let fixture: ComponentFixture<AccionPlaneadaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionPlaneadaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionPlaneadaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
