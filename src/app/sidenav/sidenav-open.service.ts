import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SidenavOpenService {

  private subjectSource = new Subject<string>();

  sendMessage(open: string): void {
    this.subjectSource.next(open);
  }

  getMessage(): Observable<any> {
    return this.subjectSource.asObservable();
  }

}
