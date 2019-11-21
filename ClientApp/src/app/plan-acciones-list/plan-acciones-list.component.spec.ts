import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAccionesListComponent } from './plan-acciones-list.component';

describe('PlanAccionesListComponent', () => {
  let component: PlanAccionesListComponent;
  let fixture: ComponentFixture<PlanAccionesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanAccionesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAccionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
