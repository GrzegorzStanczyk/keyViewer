import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { KeyService } from './key.service';
import { MapLoaderService } from '../map/map-loader.service';
import { Key } from './key.model';


@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss'],
  providers: [KeyService]
})
export class KeyComponent implements OnInit, OnDestroy {  
  markerFiltered: Promise<{}> | null = null; 
   
  subscriptionToGetCoords: Subscription;

  constructor(
    private keyService: KeyService, 
    private mapLoaderService: MapLoaderService, 
    private zone:NgZone) { 

    this.subscriptionToGetCoords = this.mapLoaderService.getCoords()
      .subscribe(coords => { 
        this.findNearest(coords)
        this.zone.run(() => this.findNearest(coords));
      })
  }

  public findNearest(coords): Promise<{}> {
    const userLatLng = new google.maps.LatLng(coords.lat, coords.lng);
    return this.markerFiltered = this.keyService.getKeys()    
      .then(keys => {
         return keys.reduce(function (prev, curr) {
          let location1 = new google.maps.LatLng(prev.lat, prev.lng)
          let location2 = new google.maps.LatLng(curr.lat, curr.lng)
          let ppos = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, location1);
          let cpos = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, location2);
          return cpos < ppos ? curr : prev;
        })
      })
  }

  ngOnInit() { 
  }

  ngOnDestroy() {
    this.subscriptionToGetCoords.unsubscribe();
  }

}
