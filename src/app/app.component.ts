import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayContainer } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Observable, Subject } from "rxjs/Rx";

import { SidenavOpenService } from './sidenav/sidenav-open.service';
import { ThemePickerService } from './app-settings/theme-picker.service';
import { DataStorageService } from './data-storage.service';
import { KeyService } from './key/key.service';
import { MapLoaderService } from './map/map-loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    SidenavOpenService, 
    ThemePickerService, 
    DataStorageService, 
    KeyService, 
    MapLoaderService]
})

export class AppComponent implements OnInit, OnDestroy {
  themeClass: string;
  newThemeClass: string;
  subscription: Subscription; 

  constructor(
    private router: Router,
    private overlayContainer: OverlayContainer,
    private themePickerService: ThemePickerService) {}

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
