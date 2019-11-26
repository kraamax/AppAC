import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesToPlanListComponent } from './acciones-to-plan-list.component';

describe('AccionesToPlanListComponent', () => {
  let component: AccionesToPlanListComponent;
  let fixture: ComponentFixture<AccionesToPlanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionesToPlanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionesToPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
