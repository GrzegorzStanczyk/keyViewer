import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ThemePickerService {

  public themeSource = new Subject<string>();

  public sendPickedTheme(theme: string): void {
    this.themeSource.next(theme);
  }

  public getPickedtheme(): Observable<string> {
    return this.themeSource.asObservable();
  }

  public storeThemeInLocalStorage(theme): void {
    localStorage.setItem('keyViewerTheme', JSON.stringify({color: theme.color, theme: theme.theme}));
  }

  public getFullThemeFromLocalStorage(): string {
    const color = this.getThemeColorFromLocalStorage();
    const theme = this.getThemeFromLocalStorage();
    return `${color}-${theme}`;    
  }

  public getThemeColorFromLocalStorage(): string {
    if (localStorage.getItem("keyViewerTheme") === null) {
      return "candy";
    }
    const themeObj = JSON.parse(localStorage.getItem('keyViewerTheme'));
    return themeObj.color;
  }

  public getThemeFromLocalStorage(): string {
    if (localStorage.getItem("keyViewerTheme") === null) {
      return "light-theme";
    }
    const themeObj = JSON.parse(localStorage.getItem('keyViewerTheme'));
    return themeObj.theme;
  }
}
