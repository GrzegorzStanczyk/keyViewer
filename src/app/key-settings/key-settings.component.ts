import { Component, OnInit } from '@angular/core';
import { slideInDownAnimation, slideInOutAnimation, slideToTop } from '../router.animations';

import { Key } from '../key/key.model';

import { DataStorageService } from '../data-storage.service';
import { KeyService } from '../key/key.service';

import { MdSnackBar } from '@angular/material';
import { TranslateService, TranslationChangeEvent, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-key-settings',
  templateUrl: './key-settings.component.html',
  styleUrls: ['./key-settings.component.scss'],
  animations: [slideToTop],
  host: { '[@routerTransition]': '' }
})
export class KeySettingsComponent implements OnInit {
  key$: Promise<Key>;
  newKey: boolean = true;
  snackBarMessage: any;

  constructor(
    private dataStorageService: DataStorageService,
    private keyService: KeyService,
    private snackBar: MdSnackBar,
    private translate: TranslateService,
    private router: Router) {
    if (this.keyService.keyToEdit !== null) {
      this.key$ = this.keyService.keyToEdit
    } else {
      this.key$ = Promise.resolve(new Key(null, null, null, null, null, null));
    }
    this.newKey = this.keyService.isItANewKey;

    // Subscribe for current language to show message in snackBar
    this.translate.get(`key-settings.snackMessage`).subscribe((res: TranslationChangeEvent) => {
          this.snackBarMessage = res;
      });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.snackBarMessage = event.translations['key-settings'].snackMessage;
    });    
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, this.snackBarMessage.close, {
      duration: 2000,
    });
  }
  
  saveKey(): void {
    this.key$.then(key => this.dataStorageService.storeKey(key))
      .then(()=>{
        this.openSnackBar(this.snackBarMessage.success)
      })
      .catch(()=>{
        this.openSnackBar(this.snackBarMessage.error)
    });
  }

  editKey() {
    // this.dataStorageService.editKey()
    this.key$.then(key => this.dataStorageService.storeKey(key))
    
    // this.dataStorageService.getKeys()
    // this.key$.then(key => this.dataStorageService.storeKey(key))    
  }

  closeAndGoToMain(): void {
    // this.sidenavOpenService.sendKeySettings();
    this.router.navigate(['/main']);
  }


  ngOnInit() { }

}
