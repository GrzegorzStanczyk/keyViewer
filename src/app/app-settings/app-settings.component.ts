import { Component, OnInit } from '@angular/core';

import { ThemePickerService } from './theme-picker.service';

class THEMEmock {
  name: string;
  color: string;
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

  
  colorButtons: THEMEmock[] = [
    {
      name: "candy",
      color: "#3F51B5"
    },
    {
      name: "unicorn",
      color: "#607D8B"
    },
    {
      name: "deeppurple-amber",
      color: "#673AB7"
    },
    {
      name: "pink-bluegrey",
      color: "#E91E63"
    },
    {
      name: "purple-green",
      color: "#9C27B0"
    }   
  ];
  
  themeButtons: THEMEmock[] = [    
    {
      name: "light-theme",
      color: "#ffffff"
    },
    {
      name: "dark-theme",
      color: "#000000"
    } 
  ]

  constructor(private themePickerService: ThemePickerService) { }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  setColorTheme(color: string) {

    console.log(color)
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
