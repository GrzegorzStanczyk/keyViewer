import { Component, OnInit } from '@angular/core';
import { slideInDownAnimation, slideInOutAnimation, slideToTop } from '../router.animations';

import { Key } from '../key/key.model';
import { KEYS } from '../key/key-mock';

import { SidenavOpenService } from '../sidenav/sidenav-open.service';
import { DataStorageService } from './data-storage.service';
import { KeyService } from '../key/key.service';
import { MapLoaderService } from '../map/map-loader.service';


@Component({
  selector: 'app-key-settings',
  templateUrl: './key-settings.component.html',
  styleUrls: ['./key-settings.component.scss'],
  animations: [slideToTop],
  host: { '[@routerTransition]': '' }
})
export class KeySettingsComponent implements OnInit {
  key: Key;

  constructor(
    private sidenavOpenService: SidenavOpenService,
    private dataStorageService: DataStorageService,
    private keyService: KeyService) { 
      if(this.keyService.keyToEdit !== null) {   
        this.keyService.keyToEdit
          .then((data)=>{
            this.key = data;
          })        
      } else {
        this.key = new Key('', null, null, null, '');
      }
    }
  
  closeAndGoToMain() {
    // this.sidenavOpenService.sendKeySettings();
    this.dataStorageService.storeKey()
      .subscribe(data => console.log(data));
  }

  getKey() {
    this.dataStorageService.getKey();
  }

  ngOnInit() {}

}
