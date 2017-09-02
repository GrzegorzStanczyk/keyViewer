import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { KeyService } from './key.service';
import { MapLoaderService } from '../map/map-loader.service';
import { Key } from './key.model';


@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit, OnDestroy {
  markerFiltered: Promise<Key> | null = null;

  subscriptionToGetCoords: Subscription;

  constructor(
    private keyService: KeyService,
    private mapLoaderService: MapLoaderService,
    private zone: NgZone,
    private router: Router) {

    this.subscriptionToGetCoords = this.mapLoaderService.getCoords()
      .subscribe(coords => {
        this.zone.run(() => {
          this.markerFiltered = this.keyService.findNearest(coords);
        });
      })
  }

  addNewKey(): void {
    this.router.navigate(['/key-settings']);
  }

  goToKeySettings(): void {
    if (this.markerFiltered) {
      // Provide nearest key to global variable keyToEdit 
      this.keyService.keyToEdit = this.markerFiltered;      
      this.router.navigate(['/key-settings']);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionToGetCoords.unsubscribe();
  }

}
