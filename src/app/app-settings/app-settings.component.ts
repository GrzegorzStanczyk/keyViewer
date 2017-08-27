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
  ringIndex: number;
  selectedColorIndex: number;


  constructor(private themePickerService: ThemePickerService) { }

  toggle() {
    !this.isOpen ? this.setRingOnSavedColor(this.color) : this.spanGoToTargetColor = null;
    !this.isOpen ? this.setRingOnSavedTheme(this.theme) : this.spanGoToTargetTheme = null;    
    this.isOpen = !this.isOpen;
  }
  
  // Clousure for the setTimeout to handle the ring displacement successively over the buttons 
  moveStepByStep(i) {
    let timing: number = 150;
    setTimeout(() => {
      this.spanGoToTargetColor = {
        'transition-duration': `${timing}ms`,
        'transform': `translate3d(${COLORBUTTONS[i].translateX}px, ${COLORBUTTONS[i].translateY}px, 0) scale(1.15)`
      };
    }, i * timing)
  }

  moveSelectedColorRing(color: Theme, i: number): void {
    // console.log('this.ringIndex przed wyborem', this.ringIndex);
    // Assign chosen index of button to the variable
    this.selectedColorIndex = i;
    // console.log('this.selectedColorIndex', this.selectedColorIndex);
    // Check on which direction to move color ring
    if(this.selectedColorIndex > this.ringIndex) {
      // console.log('to the left', this.selectedColorIndex - this.ringIndex);
      for(let i = this.ringIndex+1; i<=(this.selectedColorIndex); i++) {
        this.moveStepByStep(i);
        // console.log('this.spanGoToTargetColor', this.spanGoToTargetColor)          
      }
    } else if (this.selectedColorIndex < this.ringIndex) {
      console.log('to the right', Math.abs(this.selectedColorIndex - this.ringIndex));
      this.spanGoToTargetColor = {
        'transition-duration': `480ms`,
        'transform': `translate3d(${color.translateX}px, ${color.translateY}px, 0) scale(1.15)`
      };
    }
    // Set ring index to index of selected color 
    this.ringIndex = this.selectedColorIndex;
    // console.log('this.ringIndex po wyborze', this.ringIndex);
  }

  moveSelectedThemeRing(theme: Theme): void {
    this.spanGoToTargetTheme = {
      'transition-duration': `${theme.transitionDuration}ms`,
      'transform': `translate3d(${theme.translateX}px, ${theme.translateY}px, 0) scale(0.8)`
    };
  }

  setRingOnSavedColor(colorName: string) {
    this.colorButtons.forEach((color, index)=>{
      if(color.name === colorName) {
        this.spanGoToTargetColor = {
          'transition-duration': `${color.transitionDuration}ms`,
          'transform': `translate3d(${color.translateX}px, ${color.translateY}px, 0) scale(1.15)`
        };
        // Save the matching index for the motion animation ring step by step throught the buttons
        this.ringIndex = index;
      }
    });    
  }

  setRingOnSavedTheme(themeName: string): void {
    this.themeButtons.forEach((theme)=>{
      if(theme.name === themeName) {
        this.moveSelectedThemeRing(theme);
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
