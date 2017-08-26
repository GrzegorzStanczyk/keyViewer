import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ThemePickerService } from './theme-picker.service';

class THEMEmock {
  name: string;
  color: string;
  translateX: number;
  translateY: number;
  scale: number;
  transitionDuration: number;
}

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss']
})
export class AppSettingsComponent implements OnInit {
  color: string;
  theme: string;
  isOpen: boolean = false;
  @ViewChild('chooseRing') chooseRing: ElementRef;
  
  colorButtons: THEMEmock[] = [
    {
      name: "candy",
      color: "#3F51B5",
      translateX: 114.5,
      translateY: 147.7,
      scale: 1.1,
      transitionDuration: 160
    },
    {
      name: "unicorn",
      color: "#607D8B",
      translateX: 77.2,
      translateY: 220.2,
      scale: 1.1,
      transitionDuration: 240
    },
    {
      name: "deeppurple-amber",
      color: "#673AB7",
      translateX: 0,
      translateY: 250,
      scale: 1.1,
      transitionDuration: 320
    },
    {
      name: "pink-bluegrey",
      color: "#E91E63",
      translateX: -77.2,
      translateY: 220.2,
      scale: 1.1,
      transitionDuration: 400
    },
    {
      name: "purple-green",
      color: "#9C27B0",
      translateX: 114.5,
      translateY: 147.7,
      scale: 1.1,
      transitionDuration: 480
    }   
  ];
  
  themeButtons: THEMEmock[] = [    
    {
      name: "light-theme",
      color: "#ffffff",
      translateX: 0,
      translateY: 85,
      scale: 0.7,
      transitionDuration: 560
    },
    {
      name: "dark-theme",
      color: "#000000",
      translateX: 0,
      translateY: 150,
      scale: 0.7,
      transitionDuration: 640
    } 
  ]

  constructor(private themePickerService: ThemePickerService) { }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  moveChooseRing(obj) {
    console.log(this.chooseRing);
  }

  setColorTheme(color: string) {
    this.color = color;
    this.themePickerService.sendPickedTheme(this.color + "-" + this.theme);
    this.themePickerService.storeThemeInLocalStorage({color: this.color, theme: this.theme});    
  }

  setTheme(theme: string): void {
    this.theme = theme;
    this.themePickerService.sendPickedTheme(this.color + "-" + this.theme);
    this.themePickerService.storeThemeInLocalStorage({color: this.color, theme: this.theme});
  }

  ngOnInit() {
    this.color = this.themePickerService.getThemeColorFromLocalStorage();
    this.theme = this.themePickerService.getThemeFromLocalStorage();
  }
}
