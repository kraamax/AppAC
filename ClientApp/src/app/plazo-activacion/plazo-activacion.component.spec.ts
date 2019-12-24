import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazoActivacionComponent } from './plazo-activacion.component';

describe('PlazoActivacionComponent', () => {
  let component: PlazoActivacionComponent;
  let fixture: ComponentFixture<PlazoActivacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlazoActivacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlazoActivacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
