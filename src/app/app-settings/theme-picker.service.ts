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
}
