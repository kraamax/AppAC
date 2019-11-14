import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JefeAddComponent } from './jefe-add.component';

describe('JefeAddComponent', () => {
  let component: JefeAddComponent;
  let fixture: ComponentFixture<JefeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JefeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JefeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
