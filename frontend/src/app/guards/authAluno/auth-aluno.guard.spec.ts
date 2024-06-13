import { TestBed } from '@angular/core/testing';

import { AuthAlunoGuard } from './auth-aluno.guard';

describe('AuthAlunoGuard', () => {
  let guard: AuthAlunoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthAlunoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
