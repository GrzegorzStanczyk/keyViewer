import { Component, OnInit } from '@angular/core';
import { slideInDownAnimation, slideInOutAnimation, slideToTop } from '../router.animations';
import { Observable } from 'rxjs/Observable';

import { Key } from '../key/key.model';

import { SidenavOpenService } from '../sidenav/sidenav-open.service';
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
  snackBarMessage: any;

  constructor(
    private dataStorageService: DataStorageService,
    private keyService: KeyService,
    private snackBar: MdSnackBar,
    private translate: TranslateService,
    private router: Router,
    private sidenavOpenService: SidenavOpenService) {

      keyService.keyToEdit$.subscribe(key => this.key$ = key)
      
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
      .catch((e)=>{
        console.log(e)
        this.openSnackBar(this.snackBarMessage.error)
    });
  }

  closeAndGoToMain(): void {
    this.sidenavOpenService.toggleSidenavKeySettings();
  }

  ngOnInit() { 
  }
}
