import { Component, OnInit } from '@angular/core';

import { MapLoaderService } from '../map/map-loader.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  mapReady: boolean;

  constructor(private mapLoaderService: MapLoaderService) {
    mapLoaderService.load()
      .then((res) => {
        console.log('mapLoaderService.load.then', res);
        this.mapReady = true;
      });
  }

  ngOnInit() { }
}
