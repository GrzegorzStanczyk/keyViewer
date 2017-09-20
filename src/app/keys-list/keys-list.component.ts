import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DeleteMessageComponent } from '../delete-message/delete-message.component';

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

  private keys: Key[] = null;
  private filteredKeys: Key[] = null;
  // private paginatorMessage: any;
  keysToRender: Key[] = null;
  keysLength: number;

  constructor(
    private db: AngularFireDatabase,
    private dataStorageService: DataStorageService,
    private paginatorIntl: MdPaginatorIntl,
    private translate: TranslateService,
    private dialog: MdDialog) {
    
      this.translate.get(`keys-list.paginator`).subscribe((res: TranslationChangeEvent) => {
      this.paginatorTranslate(res)
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const paginatorMessage = event.translations['keys-list'].paginator;
      this.paginatorTranslate(paginatorMessage)
    });
  }

  paginatorTranslate(paginatorMessage) {
    this.paginatorIntl.itemsPerPageLabel = paginatorMessage.itemsPerPageLabel;
    this.paginatorIntl.nextPageLabel = paginatorMessage.nextPageLabel;
    this.paginatorIntl.previousPageLabel = paginatorMessage.previousPageLabel;
  }

  onDeleteItem(key: Key) {
    const dialogRef = this.dialog.open(DeleteMessageComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.deleteKey(key)
    });
  }

  deleteKey(key: Key) {
    this.dataStorageService.deleteKey(key)
  }

  onPaginateChange() {
    this.setPage(this.filteredKeys);
  }

  isMobile(): boolean {
    if (window.innerWidth <= 520) return true;
  }

  disableForMobile(): number[] {
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