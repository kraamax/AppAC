import { TestBed } from '@angular/core/testing';

import { AccionesRealizadasService } from './acciones-realizadas.service';

describe('AccionesRealizadasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccionesRealizadasService = TestBed.get(AccionesRealizadasService);
    expect(service).toBeTruthy();
  });
});
