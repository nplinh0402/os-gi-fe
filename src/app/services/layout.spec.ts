import { TestBed } from '@angular/core/testing';

import { Layout } from './layout';

describe('Layout', () => {
  let service: Layout;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Layout);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
