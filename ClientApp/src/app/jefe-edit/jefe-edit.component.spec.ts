import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JefeEditComponent } from './jefe-edit.component';

describe('JefeEditComponent', () => {
  let component: JefeEditComponent;
  let fixture: ComponentFixture<JefeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JefeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JefeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
