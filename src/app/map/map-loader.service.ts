import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { KeyService } from '../key/key.service';

import { Key } from '../key/key.model';


const url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAYHIBJW0pmB5AYDPWsugpqzMN2Ugg_yqU&libraries=places,geometry&callback=__onGoogleLoaded';

@Injectable()
export class MapLoaderService {
  public static promise: Promise<any>;
  private mapSubjectSource = new Subject<any>();
  public dataForNewKey: Key;

  // Subject for map reload after edit/add new key
  private localizateMeSource = new Subject<null>();
  public localizateMeSource$ = this.localizateMeSource.asObservable();

  constructor() {}

  // Subject for map reload after edit/add new key in key-settings.component
  public announceKeyUpdate() {
    this.localizateMeSource.next();
  }

  public sendCoords(obj): void {
    this.mapSubjectSource.next(obj);
  }

  public getCoords(): Observable<{}> {
    return this.mapSubjectSource.asObservable();
  }

  public load(): Promise<any> {
    // First time 'load' is called?
    if (!MapLoaderService.promise) {

      // Make promise to load.
      MapLoaderService.promise = new Promise((resolve) => {

        // Set callback for when google maps is loaded.
        window['__onGoogleLoaded'] = () => {
          resolve('google maps api loaded');
        };

        let node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        node.setAttribute('async', '');
        node.setAttribute('defer', '');
        document.getElementsByTagName('head')[0].appendChild(node);
      });
    }

    // Always return promise. When 'load' is called many times, the promise is already resolved.
    return MapLoaderService.promise
  }

  public getCurrentPosition(): Promise<any> {
    let lat: number;
    let lng: number;
    return new Promise(resolve => {
      if ("geolocation" in navigator) {
        return navigator.geolocation.getCurrentPosition((position) => {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
          resolve({ lat: lat, lng: lng })
        }, this.showError, { enableHighAccuracy: true });
      }
    })
  }

  public showError(error): void {
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

  public getDataForNewKey(cords): Promise<Key> {
    const geocoder = new google.maps.Geocoder;

    return new Promise(resolve => {
      geocoder.geocode({ 'location': { lat: cords.lat, lng: cords.lng } }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {            
            this.dataForNewKey = new Key(results[0].formatted_address, cords.lat, cords.lng, 10, '', '');
            resolve(this.dataForNewKey);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    })
  }
}
