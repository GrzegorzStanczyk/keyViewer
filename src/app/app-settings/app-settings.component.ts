import { Component, OnInit } from '@angular/core';

import { ThemePickerService } from './theme-picker.service';

import { Theme } from './theme';
import { COLORBUTTONS } from './mock-theme';
import { THEMEBUTTONS } from './mock-theme';


@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss']
})
export class AppSettingsComponent implements OnInit {
  color: string;
  theme: string;
  isOpen: boolean = false;
  colorButtons = COLORBUTTONS;
  themeButtons = THEMEBUTTONS;
  spanGoToTargetColor: {};
  spanGoToTargetTheme: {};

  constructor(private themePickerService: ThemePickerService) { }

  toggle() {
    !this.isOpen ? this.setRingOnSavedColor(this.color) : this.spanGoToTargetColor = null;
    !this.isOpen ? this.setRingOnSavedTheme(this.theme) : this.spanGoToTargetTheme = null;    
    this.isOpen = !this.isOpen;
  }

  moveSelectedColorCircle(color): void {
    this.spanGoToTargetColor = {
      'transition-duration': `480ms`,
      'transform': `translate3d(${color.translateX}px, ${color.translateY}px, 0) scale(1.15)`
    };
  }

  moveSelectedThemeCircle(theme): void {
    this.spanGoToTargetTheme = {
      'transition-duration': `${theme.transitionDuration}ms`,
      'transform': `translate3d(${theme.translateX}px, ${theme.translateY}px, 0) scale(0.8)`
    };
  }

  setRingOnSavedColor(colorName: string): void {
    this.colorButtons.forEach((color)=>{
      if(color.name === colorName) {
        this.spanGoToTargetColor = {
          'transition-duration': `${color.transitionDuration}ms`,
          'transform': `translate3d(${color.translateX}px, ${color.translateY}px, 0) scale(1.15)`
        };
      }
    });    
  }

  setRingOnSavedTheme(themeName: string): void {
    this.themeButtons.forEach((theme)=>{
      if(theme.name === themeName) {
        this.moveSelectedThemeCircle(theme);
      }
    });    
  }

  setColorTheme(color: string): void {
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
