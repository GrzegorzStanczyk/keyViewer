import { Injectable, OnDestroy } from '@angular/core';

import { Key } from './key/key.model';
// import { KEYS } from './key/key-mock';
import { Subscription }   from 'rxjs/Subscription';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from './auth/auth.service';

@Injectable()
export class DataStorageService implements OnDestroy {
  items: FirebaseListObservable<any>;
  
  item: FirebaseObjectObservable<any>;
  keys: Promise<Key[]> | null = null;

  userId: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService) {
      this.userId = authService.userId$.subscribe(userId => {
        this.items = db.list('/users/' + userId, { preserveSnapshot: true });
      })
  }
  

  storeKey(key: Key) {
    const newKey = new Key(key.streetName, key.lat, key.lng, 10, key.key, key.note);
    const properStreetName = key.streetName.split(/\.|#|\$|\[|]|\\/gm).join(",");
    
    // this.items.remove();
    // KEYS.forEach(element => {
    //   const properStreetName = element.streetName.split(/\.|#|\$|\[|]/gm).join(",");
    //   const toSend = this.db.object(`/users/${this.id}/${properStreetName}`);
    //   toSend.set(element);
    //   // this.items.push(element)
    // });

    // this.items.remove();
    // KEYS.forEach(element => {
    //   let toSend = this.db.object(`/users/${this.userId}/${element.streetName}`);
    //   const properStreetName = element.streetName.split(/\.|#|\$|\[|]/gm).join(",");
    //   this.items.update(properStreetName, element);
      
    // });

    // this.items.push( { "streetName": "Lazurowa 40, 01-315 Warszawa", "lat": 52.238957, "lng": 20.89739, "radius": 10, "key": "Orlen", note: "notatka"});
    this.items.update(properStreetName, newKey);
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

  ngOnDestroy() {
    this.userId.unsubscribe();
  }
}

