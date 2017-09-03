import { Injectable } from '@angular/core';

import { Key } from './key/key.model';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Http, Response } from '@angular/http';


@Injectable()
export class DataStorageService {
  items: FirebaseListObservable<Key[]>;
  item: FirebaseObjectObservable<any>;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase) {
      this.items = db.list('/');
  }

  storeKey() {
    // const json = JSON.parse('{"key": "##", "streat": "STREAT"}');
    // const json = JSON.parse('[{"streetName":"Lazurowa 40, 01-315 Warszawa","lat":52.238957,"lng":20.89739,"radius":10,"key":"Orlen"},{"streetName":"Postępu 12A","lat":52.176506,"lng":20.996255,"radius":10,"key":"Schindler"},{"streetName":"Amfiteatr im. Michaela Jacksona","lat":52.233631,"lng":20.906177,"radius":10,"key":"100#2580"},{"streetName":"Bolesława Prusa  43 Pruszków ","lat":52.158335,"lng":20.802447,"radius":10,"key":"S1369D"},{"streetName":"Gałczyńskiego 33 Pruszków","lat":52.183369,"lng":20.818383,"radius":10,"key":"?"},{"streetName":"Miernicza 41, Pruszków","lat":52.182309,"lng":20.822387,"radius":10,"key":"?"},{"streetName":"Bohaterów Wolności 8 Piastów","lat":52.183391,"lng":20.839458,"radius":10,"key":"#2580#"},{"streetName":"Anielin 1 Pruszków","lat":52.166818,"lng":20.807465,"radius":10,"key":"100#1410"},{"streetName":"Konotopska 5 Warszawa","lat":52.207089,"lng":20.867042,"radius":10,"key":"151#8921 51#8921"},{"streetName":"Adama Mickiewicza 17 Piastów","lat":52.179154,"lng":20.838641,"radius":10,"key":"*01#0116#"},{"streetName":"Radnych 9 Pruszków","lat":52.164606,"lng":20.802489,"radius":10,"key":"#2552#"},{"streetName":"Mechaników Pruszków","lat":52.164238,"lng":20.792717,"radius":10,"key":"99#1397"},{"streetName":"Władysława Jagiełły 33 Warszawa","lat":52.198303,"lng":20.874907,"radius":10,"key":"100#2569"}]');
    // const json = JSON.parse('{"streetName":"Lazurowa 40, 01-315 Warszawa","lat":52.238957,"lng":20.89739,"radius":10,"key":"Orlen"}');
    const key = this.db.object(`/`);
    // return this.items.update("2", { "streetName": "Lazurowa 40, 01-315 Warszawa", "lat": 52.238957, "lng": 20.89739, "radius": 10, "key": "Orlen", note: "notatka"});
    return this.items.push( { "streetName": "Lazurowa 40, 01-315 Warszawa", "lat": 52.238957, "lng": 20.89739, "radius": 10, "key": "Orlen", note: "notatka"});
    
    // return this.http.post('https://keyviewer-d5825.firebaseio.com/keys.json/', json);
  }

  getKey(): FirebaseListObservable<Key[]> {
    this.item = this.db.object('/1');
    this.item.update({ "streetName": "Lazurowa 40, 01-315 Warszawa", "lat": 52.238957, "lng": 20.89739, "radius": 10, "key": "Orlen", note: "bez notatka"});
    // this.http.get('https://keyviewer-d5825.firebaseio.com/keys.json')
    //   .subscribe(data => {
    //     for (const key of Object.keys(data)) {
    //       console.log(key, data[key].key);
    //     }
    //   });

    return this.items;
  }
  


}

