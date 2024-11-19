import { TestBed } from '@angular/core/testing';

import { PluralPiecesStateService } from './services/plural-pieces-state.service';

describe('PluralPiecesStateService', () => {
  let service: PluralPiecesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluralPiecesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
