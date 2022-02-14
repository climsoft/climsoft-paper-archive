import { TestBed } from '@angular/core/testing';

import { ArchiveListService } from './archive-list.service';

describe('ArchiveListService', () => {
  let service: ArchiveListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchiveListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
