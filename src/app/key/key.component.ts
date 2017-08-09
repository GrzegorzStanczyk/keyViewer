import { Component, OnInit } from '@angular/core';

import { KeyService } from './key.service';
import { Key } from './key.model';


@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss'],
  providers: [KeyService]
})
export class KeyComponent implements OnInit {
  
  markerFiltered: Promise<Key> | null = null;  
  // key: Promise<string>;  

  constructor(private keyService: KeyService) { }

  public findNearest(cords) {
    const userLatLng = new google.maps.LatLng(cords.lat, cords.lng);
    this.markerFiltered = this.keyService.getKeys()
      .then(keys => {
         return keys.reduce(function (prev, curr) {          
          let location1 = new google.maps.LatLng(prev.lat, prev.lng)
          let location2 = new google.maps.LatLng(curr.lat, curr.lng)
          var ppos = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, location1);
          var cpos = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, location2);
          return cpos < ppos ? curr : prev;
        })
      })
  }

  ngOnInit() { 
    this.findNearest({lat: 52.235981, lng: 20.902539})
  }

}
