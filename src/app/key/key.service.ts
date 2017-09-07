import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';

import { Key } from './key.model';

import { DataStorageService } from '../data-storage.service';


@Injectable()
export class KeyService {
  // Variable available for key-settings.component
  // public keyToEdit: Promise<Key> | null = null;
  public keyToEditO = new Subject<any>();

  keyToEditO$ = this.keyToEditO.asObservable();
  
  public isItANewKey: boolean = true;

  constructor(private dataStorageService: DataStorageService) { }

  public setKeyToEdit(key): void {
    this.keyToEditO.next(key);
  }

  public findNearest(coords): Promise<Key> {
    const userLatLng = new google.maps.LatLng(coords.lat, coords.lng);
    return this.dataStorageService.getKeys()
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

}
