import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sessionsGuard } from './sessions.guard';

describe('sessionsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sessionsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
