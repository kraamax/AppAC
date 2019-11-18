import { TestBed, async, inject } from '@angular/core/testing';

import { AuthJefeDptoGuard } from './auth-jefe-dpto.guard';

describe('AuthJefeDptoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthJefeDptoGuard]
    });
  });

  it('should ...', inject([AuthJefeDptoGuard], (guard: AuthJefeDptoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
