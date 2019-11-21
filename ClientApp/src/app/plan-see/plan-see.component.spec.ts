import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSeeComponent } from './plan-see.component';

describe('PlanSeeComponent', () => {
  let component: PlanSeeComponent;
  let fixture: ComponentFixture<PlanSeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanSeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
