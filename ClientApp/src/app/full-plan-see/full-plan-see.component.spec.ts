import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPlanSeeComponent } from './full-plan-see.component';

describe('FullPlanSeeComponent', () => {
  let component: FullPlanSeeComponent;
  let fixture: ComponentFixture<FullPlanSeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullPlanSeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPlanSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
