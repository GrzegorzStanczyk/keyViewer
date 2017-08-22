import { Component, OnInit } from '@angular/core';

import { ThemePickerService } from './theme-picker.service';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss']
})
export class AppSettingsComponent implements OnInit {
  color: string = 'candy';
  theme: string = 'light-theme';
  isOpen: boolean = false;

  constructor(private themePickerService: ThemePickerService) { }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  setColorTheme(color: string) {
    this.color = color;
    this.themePickerService.sendPickedTheme(this.color + "-" + this.theme);
  }

  setTheme(theme: string): void {
    this.theme = theme;
    this.themePickerService.sendPickedTheme(this.color + "-" + this.theme);
  }

  ngOnInit() {
  }
}
