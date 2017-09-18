import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { DataStorageService } from '../data-storage.service';
import { TranslateService, TranslationChangeEvent, LangChangeEvent } from '@ngx-translate/core';

import { MdPaginatorIntl, MdPaginator } from '@angular/material';

import { Key } from '../key/key.model';

import { Observable } from 'rxjs/Observable';
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
  private keysToRender: Key[] = null;
  private filteredKeys: Key[] = null;
  private keysLength: number;

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

  onPaginateChange(event) {
    this.setPage(this.filteredKeys);
  }

  isMobile(): boolean {
    if (window.innerWidth <= 960) return true;
    return false;
  }

  disableForMobile(): number[] {
    if (this.isMobile()) return [5];
    return [5, 10, 25, 100];
  }

  pageSize() {
    if (this.isMobile()) return 5;
    return 10;
  }

  setPage(filteredKeys?) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    if (filteredKeys) {
      this.keysToRender = filteredKeys.slice(startIndex, endIndex);
    } else {
      this.keysToRender = this.keys.slice(startIndex, endIndex);
    }
  }

  ngOnInit() {
    this.dataStorageService.getKeys()
      .then(keys => {
        this.keys = keys;
        this.keysLength = keys.length;
        this.setPage(this.filteredKeys);
      });

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe((data) => {
        if (!this.keys) { return; }
        this.filteredKeys = this.keys.filter(key => {
          return key.streetName.toLowerCase()
            .indexOf(this.filter.nativeElement.value.toLowerCase()) != -1;
        })
        // Change paginator length when filtering results
        this.keysLength = this.filteredKeys.length;
        if(this.filter.nativeElement.value === "") {
          this.filteredKeys = null
        }
        this.setPage(this.filteredKeys)
      });
  }
}
