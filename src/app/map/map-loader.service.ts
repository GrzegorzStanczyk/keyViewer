import { Injectable } from '@angular/core';
import { KeysDependentOnLocalisation } from '../key/key-mock';
import { Key } from '../key/key.model';

const url = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyAYHIBJW0pmB5AYDPWsugpqzMN2Ugg_yqU&callback=__onGoogleLoaded';

@Injectable()
export class MapLoaderService {
  public static promise: Promise<any>; 
  markersFiltered;
  lat: number = 52.176585;
  lng: number = 20.996074;
  zoom: number = 19;

  constructor() { }

  // public setCurrentPosition(): any {
  //       // return new Promise(resolve=>{
  //       if ("geolocation" in navigator) {
  //           return navigator.geolocation.getCurrentPosition((position) => {
  //               this.lat = position.coords.latitude;
  //               this.lng = position.coords.longitude;
  //               this.zoom = 18;
  //               this.findNearest()
  //           }, this.showError, { enableHighAccuracy: true });
  //       }
  //       // })
  //   }

  // public showError(error): void {
  //     switch (error.code) {
  //         case error.PERMISSION_DENIED:
  //             console.log("User denied the request for Geolocation.")
  //             break;
  //         case error.POSITION_UNAVAILABLE:
  //             console.log("Location information is unavailable.")
  //             break;
  //         case error.TIMEOUT:
  //             console.log("The request to get user location timed out.")
  //             break;
  //         case error.UNKNOWN_ERROR:
  //             console.log("An unknown error occurred.")
  //             break;
  //     }
  // }

  // public findNearest(): any {
  //       var userLatLng = new google.maps.LatLng(this.lat, this.lng);
  //       return this.markersFiltered = this.KeysDependentOnLocalisation.reduce(function (prev, curr) {
  //           let location1 = new google.maps.LatLng(prev.lat, prev.lng)
  //           let location2 = new google.maps.LatLng(curr.lat, curr.lng)
  //           var ppos = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, location1);
  //           var cpos = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, location2);
  //           return cpos < ppos ? curr : prev;
  //       }) 
  //   }

  public load(): Promise<any> {
    // First time 'load' is called?
    if(!MapLoaderService.promise) {

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
}
