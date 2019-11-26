import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesPListComponent } from './acciones-plist.component';

describe('AccionesPListComponent', () => {
  let component: AccionesPListComponent;
  let fixture: ComponentFixture<AccionesPListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionesPListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionesPListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
