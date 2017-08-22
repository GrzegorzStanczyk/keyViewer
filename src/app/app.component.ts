import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppContent } from './content';
import { OverlayContainer } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { SidenavOpenService } from './sidenav/sidenav-open.service';
import { ThemePickerService } from './app-settings/theme-picker.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SidenavOpenService, ThemePickerService]
})

export class AppComponent implements OnInit, OnDestroy {
  content: Object = AppContent;
  isDarkTheme: boolean = false;
  themeClass: string;
  newThemeClass: string = "unicorn-dark-theme";
  subscription: Subscription;

  constructor(
    private router: Router,
    private overlayContainer: OverlayContainer,
    private themePickerService: ThemePickerService) {
  }

  ngOnInit(): void {
    this.subscription = this.themePickerService.getPickedtheme()
      .subscribe(theme => {
        this.newThemeClass = theme;
        console.log("newThemeClass", this.newThemeClass)
        this.themeClass = this.newThemeClass;
        this.overlayContainer.themeClass = this.newThemeClass;
      });
    // this.themeClass = "pink-bluegrey";
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
