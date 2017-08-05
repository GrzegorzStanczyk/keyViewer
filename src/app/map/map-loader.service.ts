import { Injectable } from '@angular/core';

const url = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyAYHIBJW0pmB5AYDPWsugpqzMN2Ugg_yqU&callback=__onGoogleLoaded';

@Injectable()
export class MapLoaderService {
  public static promise: Promise<any>; 

  constructor() { }

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
