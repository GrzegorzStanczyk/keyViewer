import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { DataStorageService } from '../data-storage.service';
import { TranslateService, TranslationChangeEvent, LangChangeEvent } from '@ngx-translate/core';

import {MdPaginatorIntl, MdPaginator} from '@angular/material';

import { Key } from '../key/key.model';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';


@Component({
  selector: 'app-keys-list',
  templateUrl: './keys-list.component.html',
  styleUrls: ['./keys-list.component.scss']
})

export class KeysListComponent implements OnInit {
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;
  items: FirebaseListObservable<any[]>;
  // item: FirebaseObjectObservable<any>;
  private keys: Key[] = null;
  keysCopy: Key[] = null;

  constructor(
    private db: AngularFireDatabase,
    private dataStorageService: DataStorageService,
    private paginatorIntl: MdPaginatorIntl,
    private translate: TranslateService) {
      paginatorIntl.itemsPerPageLabel = "Przedmiotów na stronę";
      paginatorIntl.nextPageLabel = "Przedmiotów na stronę";
      paginatorIntl.previousPageLabel = "Przedmiotów na stronę";
      // paginatorIntl.getRangeLabel();
    // this.findAllLessons();
    this.translate.get(`key-settings.snackMessage`).subscribe((res: TranslationChangeEvent) => {
      // this.snackBarMessage = res;
  });

this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
  // this.snackBarMessage = event.translations['key-settings'].snackMessage;
});    
  }

  findAllLessons() {
    console.log(this.items)
    
    // return this.db.list('/keys')
    //     .subscribe(v => console.log("v", v));
  }

  addItem(item) {
    console.log(item)
    // const key = this.db.object(`/${this.i}`);
    // key.set({ "streetName": "Lazurowa 40, 01-315 Warszawa", "lat": 52.238957, "lng": 20.89739, "radius": 10, "key": "Orlen" });
    // this.items.push({"streetName":"Lazurowa 40, 01-315 Warszawa","lat":52.238957,"lng":20.89739,"radius":10,"key":"Orlen"});
  }
  updateItem() {
    // this.items.update(this.i.toString(), { "streetName": "Lazurowa 40, 01-315 Warszawa", "lat": 52.238957, "lng": 20.89739, "radius": 10, "key": "Orlen" });
  }
  deleteItem() {
    // const key = this.db.object(`/keys/${this.i}`);
    // key.remove();

    // this.items.remove(key); 
  }
  deleteEverything() {
    // this.items.remove();
  }

  onPaginateChange(event){
    // this.keysCopy = this.keys.slice();
    // this.keys = this.keysCopy.splice(event.pageIndex, this.paginator.pageSize);
    this.setPage(0);

    // this.dataStorageService.getKeys()
    // .then(keys=>{
    //   this.keys = this.keys.splice(event.pageIndex, this.paginator.pageSize);
    //   // console.log('startIndex', startIndex, 'pageSize', this.paginator.pageSize)
    //   // console.log('keys', keys)
    // });
  }

  isMobile(): boolean {
    if(window.innerWidth <= 960) return true;
    return false;
  }

  disableForMobile(): number[] {
    if(this.isMobile()) return [5];
    return [5, 10, 25, 100];
  }

  pageSize() {
    if(this.isMobile()) return 5;
    return 10;
  }

  setPage(page: number) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.keysCopy = this.keys.slice(startIndex, endIndex);
  }

  ngOnInit() {
    this.dataStorageService.getKeys()
      .then(keys=>{
        this.keys = keys;
        this.setPage(0);
      });
    
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe((data) => {
      if (!this.keysCopy) { return; }
          this.keysCopy = this.keys.filter(key=>{
            return key.streetName.toLowerCase()
              .indexOf(this.filter.nativeElement.value.toLowerCase()) != -1;
          })
    });
  }
}
