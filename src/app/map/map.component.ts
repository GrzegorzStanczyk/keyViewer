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
  localizatoionProgresBar: boolean = null;

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

    this.storeLocalization(coords);
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
    this.localizatoionProgresBar = false;

    const marker = this.setMarker(map);
    marker.setPosition(mapProp.center);
    marker.setVisible(true);
  }

  localizateMe(showProgrssBar?: string): void {
    if(showProgrssBar) this.localizatoionProgresBar = true;
    this.mapLoaderService.getCurrentPosition()
    .then(coords => {
      this.storeLocalization(coords);
      this.loadMap(coords);
    });
  }

  storeLocalization(coords): void {
    //Send coordinates to the key.component    
    this.mapLoaderService.sendCoords(coords);
    
    // Provide data for edit or add new key
    let data = this.mapLoaderService.getDataForNewKey(coords);
    this.keyService.setKeyToEdit(data);  
    this.keyService.setNewKeyToEdit(data);  
  }
  
  ngOnInit() {
    if (typeof google !== 'undefined') {
      this.localizateMe()
    }
    // Subscription for map reload after edit/add new key
    this.mapLoaderService.localizateMeSource$
      .subscribe(()=>this.localizateMe('showProgrssBar'))
  }

}
