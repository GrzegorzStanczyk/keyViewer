import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { AppContent } from '../content';

import { MapLoaderService } from './map-loader.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('googleMap') el: ElementRef;
  content = AppContent;

  lat: number;
  lng: number;

  constructor(private mapLoaderService: MapLoaderService) { }

  // Get place from autocomplete search input provided by google api
  getPlaceOnChange(place) {

    if (!place) {
      window.alert(this.content.pl.alert.placeNotFound);
      return;
    }

    const map = new google.maps.Map(this.el.nativeElement, { streetViewControl: false, mapTypeControl: false });

    const marker = new google.maps.Marker();
    marker.set('map', map);
    marker.set('anchorPoint', new google.maps.Point(0, -29));

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    //Send coordinates to the key.component    
    this.mapLoaderService.sendCoords({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
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
  }

  getCurrentPosition(): Promise<any> {
    return new Promise(resolve => {
      if ("geolocation" in navigator) {
        return navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          resolve({ lat: this.lat, lng: this.lng })
        }, this.showError, { enableHighAccuracy: true });
      }
    })
  }

  showError(error): void {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.")
        break;
    }
  }

  localizateMe() {
    this.getCurrentPosition()
    .then(coords => {
      //Send coordinates to the key.component
      this.mapLoaderService.sendCoords({ lat: coords.lat, lng: coords.lng });
      this.loadMap(coords);
    });
  }

  ngOnInit() {
    if (typeof google !== 'undefined') {
      console.log('MapComponent.ngOnInit');
      this.localizateMe()
    }
  }

}
