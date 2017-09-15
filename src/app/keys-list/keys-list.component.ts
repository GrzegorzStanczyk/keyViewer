import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { DataStorageService } from '../data-storage.service';

// import {MdPaginator} from '@angular/material';

import { Key } from '../key/key.model';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-keys-list',
  templateUrl: './keys-list.component.html',
  styleUrls: ['./keys-list.component.scss']
})

export class KeysListComponent implements OnInit {
  // @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;
  items: FirebaseListObservable<any[]>;
  // item: FirebaseObjectObservable<any>;
  i = 0;
  keys: Key[] = null;
  keysCopy: Key[] = null;

  constructor(
    private db: AngularFireDatabase,
    private dataStorageService: DataStorageService) {
    // this.findAllLessons();
  }

  findAllLessons() {
    console.log(this.items)
    
    // return this.db.list('/keys')
    //     .subscribe(v => console.log("v", v));
  }

  addItem(item) {
    console.log(item)
    
    // this.i++;
    // const key = this.db.object(`/${this.i}`);
    // key.set({ "streetName": "Lazurowa 40, 01-315 Warszawa", "lat": 52.238957, "lng": 20.89739, "radius": 10, "key": "Orlen" });
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
    // this.items = this.dataStorageService.items;
    // this.keys = this.dataStorageService.getKeys()
    this.dataStorageService.getKeys()
      .then(keys=>{
        this.keys = keys;
        this.keysCopy = this.keys.slice()
      });
    
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .subscribe((data) => {
      if (!this.keys) { return; }
          this.keys = this.keysCopy.filter(key=>{
            console.log(key)
            return key.streetName.toLowerCase()
              .indexOf(this.filter.nativeElement.value.toLowerCase()) != -1;
          })
    });
  }
}
