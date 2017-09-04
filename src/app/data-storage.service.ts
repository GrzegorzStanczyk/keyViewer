import { Injectable } from '@angular/core';

import { Key } from './key/key.model';
import { KEYS } from './key/key-mock';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Injectable()
export class DataStorageService {
  items: FirebaseListObservable<any>;
  
  item: FirebaseObjectObservable<any>;
  keys: Promise<Key[]> | null = null;

  constructor(
    private db: AngularFireDatabase) {
      this.items = db.list('/', { preserveSnapshot: true });
      // this.items
      // .subscribe(items => {
      //   this.keys = items.map(item => {
      //       return item.val();
      //   });
      // });
  }
  

  storeKey() {
    // this.items.remove();
    // KEYS.forEach(element => {
    //   this.items.push(element)
    // });

    // return this.items.update("2", { "streetName": "Lazurowa 40, 01-315 Warszawa", "lat": 52.238957, "lng": 20.89739, "radius": 10, "key": "Orlen", note: "notatka"});
    // return this.items.push( { "streetName": "Lazurowa 40, 01-315 Warszawa", "lat": 52.238957, "lng": 20.89739, "radius": 10, "key": "Orlen", note: "notatka"});
    
  }

  getKeys(): Promise<Key[]> {
    return new Promise(resolve=>{      
      this.items
      .subscribe(items=> {
        this.keys = items.map(item=>item.val())
        resolve(this.keys)
      })
    })    
  }  
}

