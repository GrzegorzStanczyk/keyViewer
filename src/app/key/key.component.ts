import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SidenavOpenService } from '../sidenav/sidenav-open.service';
import { KeyService } from './key.service';
import { MapLoaderService } from '../map/map-loader.service';
import { TranslateService, TranslationChangeEvent, LangChangeEvent } from '@ngx-translate/core';

import { Key } from './key.model';


@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnDestroy {
  markerFiltered: Promise<Key> | null = null;
  welcomeMessage: string =  null;
  subscriptionToGetCoords: Subscription;

  constructor(
    private keyService: KeyService,
    private mapLoaderService: MapLoaderService,
    private zone: NgZone,
    private sidenavOpenService: SidenavOpenService,
    private translate: TranslateService) {
      
    // this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    //   this.welcomeMessage = event.translations['key-component'].welcomeMessage;
    //   this.markerFiltered = this.isInit();
    // });

    this.subscriptionToGetCoords = this.mapLoaderService.getCoords()
      .subscribe(coords => {
        this.zone.run(() => {
          this.markerFiltered = this.keyService.findNearest(coords)
            .catch(e=>{
              // Subscribe for current language to show welcome message
            //   this.translate.get(`key-component.welcomeMessage`).subscribe((res: TranslationChangeEvent) => {
            //   this.welcomeMessage = res.toString();
            // });
            return this.isInit();
            // return null;
            });
        });
      })
  }

  isInit(): Promise<Key> {
    return Promise.resolve(new Key('', null, null, null, '', ''));
  }

  addNewKey(): void {
    this.keyService.addNewKey();
    this.sidenavOpenService.toggleSidenavKeySettings();
  }

  goToKeySettings(): void {
    if (this.markerFiltered) {
    
      // Provide nearest key to global variable keyToEdit 
      this.keyService.setKeyToEdit(this.markerFiltered);

      this.sidenavOpenService.toggleSidenavKeySettings();
    } else {
      this.addNewKey();
    }
  }

  ngOnDestroy() {
    this.subscriptionToGetCoords.unsubscribe();
  }

}
