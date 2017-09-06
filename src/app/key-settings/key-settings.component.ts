import { Component, OnInit } from '@angular/core';
import { slideInDownAnimation, slideInOutAnimation, slideToTop } from '../router.animations';

import { Key } from '../key/key.model';

import { SidenavOpenService } from '../sidenav/sidenav-open.service';
import { DataStorageService } from '../data-storage.service';
import { KeyService } from '../key/key.service';


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

  constructor(
    private sidenavOpenService: SidenavOpenService,
    private dataStorageService: DataStorageService,
    private keyService: KeyService) {
    if (this.keyService.keyToEdit !== null) {
      this.key$ = this.keyService.keyToEdit
    } else {
      this.key$ = Promise.resolve(new Key(null, null, null, null, null, null));
    }
    this.newKey = this.keyService.isItANewKey;
  }

  saveKey(): void {
    // .then(data => console.log(data));
    this.key$.then(key => this.dataStorageService.storeKey(key))
    // .subscribe(data => console.log(data));
  }

  editKey() {
    // this.dataStorageService.editKey()
    this.key$.then(key => this.dataStorageService.storeKey(key))
    
    // this.dataStorageService.getKeys()
    // this.key$.then(key => this.dataStorageService.storeKey(key))    
  }

  closeAndGoToMain(): void {
    this.sidenavOpenService.sendKeySettings();
  }


  ngOnInit() { }

}
