import { TestBed, inject } from '@angular/core/testing';

import { MapLoaderService } from './map-loader.service';

describe('MapLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapLoaderService]
    });
  });

  it('should be created', inject([MapLoaderService], (service: MapLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
