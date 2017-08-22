import { Component, OnInit } from '@angular/core';

import { ThemePickerService } from './theme-picker.service';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss']
})
export class AppSettingsComponent implements OnInit {
  isDarkTheme: boolean = false;
  isOpen: boolean = false;

  constructor(private themePickerService: ThemePickerService) { }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  setTheme(theme: string): void {
    this.themePickerService.sendPickedTheme(theme);
  }

  ngOnInit() {
  }
  
  changeTheme(): void {
    if (this.isDarkTheme) {
       this.isDarkTheme = false;
    } else {
       this.isDarkTheme = true;
    }
 }

}
