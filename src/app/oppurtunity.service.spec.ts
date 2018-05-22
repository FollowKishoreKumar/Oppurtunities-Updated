import { TestBed, inject } from '@angular/core/testing';

import { OppurtunityService } from './oppurtunity.service';

describe('OppurtunityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OppurtunityService]
    });
  });

  it('should be created', inject([OppurtunityService], (service: OppurtunityService) => {
    expect(service).toBeTruthy();
  }));
});
