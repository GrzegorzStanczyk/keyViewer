import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppContent } from './content';
import { OverlayContainer } from '@angular/material';

import { SidenavOpenService } from './sidenav/sidenav-open.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SidenavOpenService]
})

export class AppComponent implements OnInit {
  content: Object = AppContent;
  isDarkTheme: boolean = false;
  themeClass: string;
  newThemeClass: string = "unicorn-dark-theme";
  
  constructor(private router: Router, private overlayContainer: OverlayContainer) {}

  changeTheme(): void {
    if (this.isDarkTheme) {
       this.isDarkTheme = false;
    } else {
       this.isDarkTheme = true;
    }
 }

 ngOnInit():void {
  this.themeClass = "pink-bluegrey";
  this.overlayContainer.themeClass = "candy-theme";
 }
}
