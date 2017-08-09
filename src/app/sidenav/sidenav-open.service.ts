import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SidenavOpenService {

  private subjectSource = new Subject<any>();
  private keySettingsSource = new Subject<any>();

  public sendMessage(): void {
    this.subjectSource.next();
  }

  public sendKeySettings(): void {
    this.keySettingsSource.next();
  }

  public getMessage(): Observable<any> {
    return this.subjectSource.asObservable();
  }

  public getKeySettings(): Observable<any> {
    return this.keySettingsSource.asObservable();
  }

}
