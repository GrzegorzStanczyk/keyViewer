import { TestBed, inject } from '@angular/core/testing';

import { SidenavOpenService } from './sidenav-open.service';

describe('SidenavOpenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavOpenService]
    });
  });

  it('should be created', inject([SidenavOpenService], (service: SidenavOpenService) => {
    expect(service).toBeTruthy();
  }));
});
