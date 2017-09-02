import { Injectable } from '@angular/core';

import { Key } from './key.model';
import { KEYS } from './key-mock';


@Injectable()
export class KeyService {
  public keyToEdit: Promise<Key> | null = null;

  constructor() { }

  public getKeys(): Promise<Key[]> {
    console.log(JSON.stringify(KEYS));
    return Promise.resolve(KEYS);
  }

  public findNearest(coords): Promise<Key> {
    const userLatLng = new google.maps.LatLng(coords.lat, coords.lng);
    return this.getKeys()    
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
