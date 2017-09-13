import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-keys-list',
  templateUrl: './keys-list.component.html',
  styleUrls: ['./keys-list.component.scss']
})

export class KeysListComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any>;
  i = 0;

  constructor(private db: AngularFireDatabase) {
    // this.items = db.list('/');
    // this.findAllLessons();
  }

  findAllLessons() {
    return this.db.list('/keys')
        .subscribe(v => console.log("v", v));
  }

  addItem() {
    this.i++;
    const key = this.db.object(`/${this.i}`);
    key.set({ "streetName": "Lazurowa 40, 01-315 Warszawa", "lat": 52.238957, "lng": 20.89739, "radius": 10, "key": "Orlen" });
    // this.items.push({"streetName":"Lazurowa 40, 01-315 Warszawa","lat":52.238957,"lng":20.89739,"radius":10,"key":"Orlen"});
  }
  updateItem() {
    this.i++;
    this.items.update(this.i.toString(), { "streetName": "Lazurowa 40, 01-315 Warszawa", "lat": 52.238957, "lng": 20.89739, "radius": 10, "key": "Orlen" });
  }
  deleteItem() {
    console.log(this.i)
    const key = this.db.object(`/keys/${this.i}`);
    key.remove();
    this.i--;

    // this.items.remove(key); 
  }
  deleteEverything() {
    // this.items.remove();
  }

  ngOnInit() {
  }

}
