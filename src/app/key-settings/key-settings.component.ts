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

  constructor(
    private sidenavOpenService: SidenavOpenService,
    private dataStorageService: DataStorageService,
    private keyService: KeyService) {
    if (this.keyService.keyToEdit !== null) {
      this.key$ = this.keyService.keyToEdit
    } else {
      this.key$ = new Promise(resolve => resolve(new Key(null, null, null, null, null, null)));
    }
  }

  saveKey(): void {
    this.dataStorageService.storeKey()
    .then(data => console.log(data));
    
    // .subscribe(data => console.log(data));
  }
  
  getKey(): void {
    this.dataStorageService.getKey()
    .subscribe(v => console.log("v", v));
  }

  closeAndGoToMain(): void {
    this.sidenavOpenService.sendKeySettings();
  }


  ngOnInit() { }

}
