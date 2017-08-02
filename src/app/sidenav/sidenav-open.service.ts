import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SidenavOpenService {

  private subjectSource = new Subject<any>();

  sendMessage(): void {
    this.subjectSource.next();
  }

  getMessage(): Observable<any> {
    return this.subjectSource.asObservable();
  }

}
