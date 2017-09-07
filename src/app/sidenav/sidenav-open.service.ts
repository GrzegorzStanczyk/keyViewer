import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SidenavOpenService {

  public toggleSidenavMenuSource = new Subject<any>();
  public toggleSidenavKeySettingsSource = new Subject<any>();
  
  toggleSidenavMenu$ = this.toggleSidenavMenuSource.asObservable();
  toggleSidenavKeySettingsSource$ = this.toggleSidenavKeySettingsSource.asObservable();
  
  public toggleSidenavMenu(): void {
    this.toggleSidenavMenuSource.next();
  }

  public toggleSidenavKeySettings(): void {
    this.toggleSidenavKeySettingsSource.next();
  }
}
