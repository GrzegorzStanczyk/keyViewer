import { Injectable, OnDestroy } from '@angular/core';

import { Key } from './key/key.model';

import { Subscription } from 'rxjs/Subscription';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from './auth/auth.service';


@Injectable()
export class DataStorageService implements OnDestroy {
  items: FirebaseListObservable<any>;
  keys: Promise<Key[]> | null = null;

  userId: Subscription;
  userState: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService) {
      this.userId = this.authService.userId$.subscribe(userId => {
        this.items = this.db.list('/users/' + userId, { preserveSnapshot: true });
      });
      this.userState = this.authService.logOutSource$.subscribe(userId => {
        // Unsubscribe from listening route
        this.items.$ref.off()
      });
  }

  storeKey(key: Key) {
    const newKey = new Key(key.streetName, key.lat, key.lng, key.radius, key.key, key.note);
    const properStreetName = key.streetName.split(/\.|#|\$|\[|]|\\/gm).join(",").trim();
    this.items.update(properStreetName, newKey);
  }

  getKeys(): Promise<Key[]> {
    return new Promise(resolve => {
        this.items
        .subscribe(items => {
          this.keys = items.map(item => item.val())
          resolve(this.keys)
        })
    })
  }

  deleteKey(key: Key) {
    this.items.remove(key.streetName.trim());
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.userId.unsubscribe();
    this.userState.unsubscribe();
  }
}

