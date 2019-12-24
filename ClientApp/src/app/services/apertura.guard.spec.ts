import { TestBed, async, inject } from '@angular/core/testing';

import { AperturaGuard } from './apertura.guard';

describe('AperturaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AperturaGuard]
    });
  });

  it('should ...', inject([AperturaGuard], (guard: AperturaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
