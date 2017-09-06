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
  

  storeKey(key: Key) {
    const newKey = new Key(key.streetName, key.lat, key.lng, 10, key.key, key.note);
    const properStreetName = key.streetName.split(/\.|#|\$|\[|]/gm).join(",");
    
    // this.items.remove();
    // KEYS.forEach(element => {
    //   this.items.push(element)
    // });

    // return this.items.update("2", { "streetName": "Lazurowa 40, 01-315 Warszawa", "lat": 52.238957, "lng": 20.89739, "radius": 10, "key": "Orlen", note: "notatka"});
    // this.items.push( { "streetName": "Lazurowa 40, 01-315 Warszawa", "lat": 52.238957, "lng": 20.89739, "radius": 10, "key": "Orlen", note: "notatka"});
    this.items.update(properStreetName, newKey);
  }

  editKey() {
    const newKey =new Key('Amfiteatr im. Michaela Jacksona', 52.233631, 20.906177, 10, '100#2580', null);
    
    // this.items.remove();
    // KEYS.forEach(element => {
    //   let toSend = this.db.object(`/${element.streetName}`);
    //   toSend.set(element);
    // });


    // ".", "#", "$", "[", or "]"
    // this.items.remove();
    // KEYS.forEach(element => {
    //   // const properStreetName = element.streetName.replace(/\.|#|\$|\[|]/gm,',');
    //   const properStreetName = element.streetName.split(/\.|#|\$|\[|]/gm).join(",");
      
    //   const toSend = this.db.object(`/${properStreetName}`);
    //   toSend.set(element);
    // });
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

