import { TestBed } from '@angular/core/testing';

import { PluralPiecesActionService } from './services/plural-pieces-action.service';

describe('PluralPiecesActionService', () => {
  let service: PluralPiecesActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluralPiecesActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
