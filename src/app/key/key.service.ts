import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';

import { Key } from './key.model';

import { DataStorageService } from '../data-storage.service';


@Injectable()
export class KeyService {
  // Variable available for key-settings.component
  private keyToEdit = new Subject<any>();
  private newKeyToEdit: Key;
  keyToEdit$ = this.keyToEdit.asObservable();

  constructor(private dataStorageService: DataStorageService) { }

  addNewKey():void {
    this.setKeyToEdit(this.newKeyToEdit);
  }

  // Subject in map.component
  setNewKeyToEdit(key): void {
    this.newKeyToEdit = key;
  }
  
  // Subject in key.component
  setKeyToEdit(key): void {
    this.keyToEdit.next(key);
  }

  findNearest(coords): Promise<Key> {
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
      .catch(error => {
        return new Key('', null, null, null, 'Welcome', '');
      })
  }
}
