import { TestBed } from '@angular/core/testing';

import { PlanAccionesService } from './plan-acciones.service';

describe('PlanAccionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanAccionesService = TestBed.get(PlanAccionesService);
    expect(service).toBeTruthy();
  });
});
