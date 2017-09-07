import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { SidenavOpenService } from '../sidenav/sidenav-open.service';
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
    private router: Router,
    private sidenavOpenService: SidenavOpenService) {

    this.subscriptionToGetCoords = this.mapLoaderService.getCoords()
      .subscribe(coords => {
        this.zone.run(() => {
          this.markerFiltered = this.keyService.findNearest(coords);
        });
      })
  }

  addNewKey(): void {
    this.keyService.isItANewKey = true;
    // this.router.navigate(['/key-settings']);
    
    this.mapLoaderService.getCurrentPosition()
    .then(coords => {
      let data = this.mapLoaderService.getStreetName(coords);
      this.keyService.setKeyToEdit(data);  
    });
    
    this.sidenavOpenService.toggleSidenavKeySettings();
  }

  goToKeySettings(): void {
    if (this.markerFiltered) {
      this.keyService.isItANewKey = false;
    
      // Provide nearest key to global variable keyToEdit 
      // this.keyService.keyToEdit = this.markerFiltered;  
      this.keyService.setKeyToEdit(this.markerFiltered);  
      
      // this.router.navigate(['/key-settings']);    
      this.sidenavOpenService.toggleSidenavKeySettings();
      
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionToGetCoords.unsubscribe();
  }

}
