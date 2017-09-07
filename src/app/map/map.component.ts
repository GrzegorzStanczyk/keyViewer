import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { MapLoaderService } from './map-loader.service';
import { KeyService } from '../key/key.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('googleMap') el: ElementRef;

  mapReady: boolean = null;

  constructor(
    private mapLoaderService: MapLoaderService,
    private keyService: KeyService) { }

  setMarker(map) {
    const marker = new google.maps.Marker();
    marker.set('map', map);
    marker.set('anchorPoint', new google.maps.Point(0, -29));
    return marker;
  }

  // Get place from autocomplete search input provided by google api
  getPlaceOnChange(place) {

    if (!place) {
      window.alert("Returned place contains no geometry\nNie udało nam się znaleźć wyników dla zapytania");
      return;
    }

    const map = new google.maps.Map(this.el.nativeElement, { streetViewControl: false, mapTypeControl: false });

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
    }

    const marker = this.setMarker(map);

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    const coords = {
      lat: place.geometry.location.lat(), 
      lng: place.geometry.location.lng()
    }
    // Send coordinates to the key.component    
    this.mapLoaderService.sendCoords(coords);
    // Provide street name and coords to global variable keyToEdit
    // this.keyService.keyToEdit = this.mapLoaderService.getStreetName(coords);
    let data = this.mapLoaderService.getStreetName(coords);
    this.keyService.setKeyToEdit(data);  
    
  }

  loadMap(coords): void {
    const mapProp = {
      center: new google.maps.LatLng(coords.lat, coords.lng),
      zoom: 17,
      streetViewControl: false,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    const map = new google.maps.Map(this.el.nativeElement, mapProp);
    this.mapReady = true;
    const marker = this.setMarker(map);

    marker.setPosition(mapProp.center);
    marker.setVisible(true);
  }

  localizateMe(): void {
    this.mapLoaderService.getCurrentPosition()
    .then(coords => {
      //Send coordinates to the key.component
      this.mapLoaderService.sendCoords({ lat: coords.lat, lng: coords.lng });
      
      // this.keyService.keyToEdit = this.mapLoaderService.getStreetName(coords);
      let data = this.mapLoaderService.getStreetName(coords);
      this.keyService.setKeyToEdit(data);  

      this.loadMap(coords);
    });
  }
  
  ngOnInit() {
    if (typeof google !== 'undefined') {
      this.localizateMe()
    }
  }

}
