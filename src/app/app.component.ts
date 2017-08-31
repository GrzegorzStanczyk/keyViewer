import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayContainer } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import {Observable, Subject} from "rxjs/Rx";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { SidenavOpenService } from './sidenav/sidenav-open.service';
import { ThemePickerService } from './app-settings/theme-picker.service';
import { DataStorageService } from './key-settings/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SidenavOpenService, ThemePickerService, DataStorageService]
})

export class AppComponent implements OnInit, OnDestroy {
  themeClass: string;
  newThemeClass: string;
  subscription: Subscription;
  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable <any>;
  i = 0;

  constructor(
    private router: Router,
    private overlayContainer: OverlayContainer,
    private themePickerService: ThemePickerService,
    private db: AngularFireDatabase) {
      this.items = db.list('/');
      this.findAllLessons();
  }

  findAllLessons() {
    return this.db.list('/keys')
        .subscribe(v => console.log("v", v));
  }

  addItem() {
    this.i++;
    const key = this.db.object(`/${this.i}`);
    key.set({"streetName":"Lazurowa 40, 01-315 Warszawa","lat":52.238957,"lng":20.89739,"radius":10,"key":"Orlen"});
    // this.items.push({"streetName":"Lazurowa 40, 01-315 Warszawa","lat":52.238957,"lng":20.89739,"radius":10,"key":"Orlen"});
  }
  updateItem() {
    this.i++;
    this.items.update(this.i.toString(), {"streetName":"Lazurowa 40, 01-315 Warszawa","lat":52.238957,"lng":20.89739,"radius":10,"key":"Orlen"});
  }
  deleteItem() {    
    console.log(this.i)
    const key = this.db.object(`/keys/${this.i}`);
    key.remove();
    this.i--;
    
    // this.items.remove(key); 
  }
  deleteEverything() {
    // this.items.remove();
  }

  ngOnInit(): void {
    this.themeClass = this.themePickerService.getFullThemeFromLocalStorage();
    this.subscription = this.themePickerService.getPickedtheme()
      .subscribe(theme => {
        this.newThemeClass = theme;
        this.themeClass = this.newThemeClass;
        this.overlayContainer.themeClass = this.newThemeClass;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
