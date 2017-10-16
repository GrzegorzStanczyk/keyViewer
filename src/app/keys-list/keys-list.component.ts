import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DeleteMessageComponent } from '../delete-message/delete-message.component';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { DataStorageService } from '../data-storage.service';
import { TranslateService, TranslationChangeEvent, LangChangeEvent } from '@ngx-translate/core';

import { MdPaginatorIntl, MdPaginator } from '@angular/material';
import { MdSnackBar } from '@angular/material';

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
  snackBarMessage: any;

  constructor(
    private db: AngularFireDatabase,
    private dataStorageService: DataStorageService,
    private paginatorIntl: MdPaginatorIntl,
    private translate: TranslateService,
    private dialog: MdDialog,
    private snackBar: MdSnackBar) {
    
      this.translate.get(`keys-list.paginator`).subscribe((res: TranslationChangeEvent) => {
        this.paginatorTranslate(res)
      });
  
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        const paginatorMessage = event.translations['keys-list'].paginator;
        this.paginatorTranslate(paginatorMessage)
      });
      
      // Subscribe for current language to show message in snackBar
      this.translate.get(`key-settings.snackMessage`).subscribe((res: TranslationChangeEvent) => {
        this.snackBarMessage = res;
      });
  
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.snackBarMessage = event.translations['key-settings'].snackMessage;
      });    
  }

  paginatorTranslate(paginatorMessage) {
    this.paginatorIntl.itemsPerPageLabel = paginatorMessage.itemsPerPageLabel;
    this.paginatorIntl.nextPageLabel = paginatorMessage.nextPageLabel;
    this.paginatorIntl.previousPageLabel = paginatorMessage.previousPageLabel;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, this.snackBarMessage.close, {
      duration: 2000,
    });
  }

  editKey(key) {
    try {
      this.dataStorageService.storeKey(key);
      this.openSnackBar(this.snackBarMessage.success);
    } catch (e) {
      console.log(e);
      this.openSnackBar(this.snackBarMessage.error);
    }
  }

  onDeleteItem(key: Key) {
    const dialogRef = this.dialog.open(DeleteMessageComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteKey(key);
        this.prepareData();
      }
    });
  }

  deleteKey(key: Key) {
    this.dataStorageService.deleteKey(key);
  }
  
  isMobile(): boolean {
    if (window.innerWidth <= 520) return true;
  }
  
  disableForMobile(): number[] {
    return [5, 10, 25, 100];
  }
  
  pageSize(): number {
    if (this.isMobile()) return 5;
    return 10;
  }

  onPaginateChange() {
    this.setPage(this.filteredKeys);
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

  sortKeys(keys: Key[]): Key[] {
    return keys.sort((a,b) => {
      var A = a.streetName.toLowerCase();
      var B = b.streetName.toLowerCase();
      if (A < B){
         return -1;
      }else if (A > B){
        return  1;
      }else{
        return 0;
      }
    })
  }

  prepareData() {
    this.dataStorageService.getKeys()
    .then(keys => {
      this.keys = this.sortKeys(keys);
      this.keysLength = keys.length;
      this.setPage(this.filteredKeys);
    });
  }

  filterKeys() {
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
      console.log('this.paginator.pageSize', this.paginator.pageSize)
      // Change paginator pageIndex to 0
      this.paginator.pageIndex = 0;
      if(this.filter.nativeElement.value === "") {
        this.filteredKeys = null
      }
      this.setPage(this.filteredKeys)
    });
  }

  ngOnInit() {
    this.prepareData();
    this.filterKeys();
  }
}