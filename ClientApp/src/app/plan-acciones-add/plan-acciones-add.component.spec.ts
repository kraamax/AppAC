import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAccionesAddComponent } from './plan-acciones-add.component';

describe('PlanAccionesAddComponent', () => {
  let component: PlanAccionesAddComponent;
  let fixture: ComponentFixture<PlanAccionesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanAccionesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAccionesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
