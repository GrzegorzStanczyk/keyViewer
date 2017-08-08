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
  
  markersFiltered: Key;
  

  constructor(private keyService: KeyService) { }

  public findNearest(cords): Key {
    const userLatLng = new google.maps.LatLng(cords.lat, cords.lng);
    this.keyService.getKeys()
      .then(keys => {
        let value;
        return this.markersFiltered = keys.reduce(function (prev, curr) {
          let location1 = new google.maps.LatLng(prev.lat, prev.lng)
          let location2 = new google.maps.LatLng(curr.lat, curr.lng)
          var ppos = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, location1);
          var cpos = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, location2);
          return cpos < ppos ? curr : prev;;
        })
      })
      console.log(this.markersFiltered)
      return this.markersFiltered;
  }

  ngOnInit() { }

}
