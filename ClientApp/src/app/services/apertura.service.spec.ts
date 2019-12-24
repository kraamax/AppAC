import { TestBed } from '@angular/core/testing';

import { AperturaService } from './apertura.service';

describe('AperturaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AperturaService = TestBed.get(AperturaService);
    expect(service).toBeTruthy();
  });
});
