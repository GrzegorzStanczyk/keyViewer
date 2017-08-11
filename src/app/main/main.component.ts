import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MapLoaderService } from '../map/map-loader.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MapLoaderService]
})
export class MainComponent implements OnInit {
  mapReady: boolean;

  constructor(private mapLoaderService: MapLoaderService, 
              private router: Router) {
    mapLoaderService.load()
      .then((res) => {
        console.log('mapLoaderService.load.then', res);
        this.mapReady = true;
      });
  }

  goToKeySettings(): void {
    this.router.navigate(['/key-settings']);
  }

  ngOnInit() {}
}
