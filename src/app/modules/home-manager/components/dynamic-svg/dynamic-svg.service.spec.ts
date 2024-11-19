import { TestBed } from '@angular/core/testing';

import { DynamicSvgService } from './dynamic-svg.service';

describe('DynamicSvgService', () => {
  let service: DynamicSvgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicSvgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
