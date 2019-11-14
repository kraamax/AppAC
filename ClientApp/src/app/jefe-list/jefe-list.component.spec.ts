import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JefeListComponent } from './jefe-list.component';

describe('JefeListComponent', () => {
  let component: JefeListComponent;
  let fixture: ComponentFixture<JefeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JefeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JefeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
