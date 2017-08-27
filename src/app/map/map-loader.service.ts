import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';

import { KEYS } from '../key/key-mock';
import { Key } from '../key/key.model';


const url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAYHIBJW0pmB5AYDPWsugpqzMN2Ugg_yqU&libraries=places,geometry&callback=__onGoogleLoaded';

@Injectable()
export class MapLoaderService {
  public static promise: Promise<any>;
  public mapSubjectSource = new Subject<any>();
  
  public sendCoords(obj): void {
    this.mapSubjectSource.next(obj);
  }

  public getCoords(): Observable<{}> {
    return this.mapSubjectSource.asObservable();
  }

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
