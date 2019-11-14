import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementaryActivityAddComponent } from './complementary-activity-add.component';

describe('ComplementaryActivityAddComponent', () => {
  let component: ComplementaryActivityAddComponent;
  let fixture: ComponentFixture<ComplementaryActivityAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplementaryActivityAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplementaryActivityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
