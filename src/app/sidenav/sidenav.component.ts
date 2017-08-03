import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SidenavOpenService } from './sidenav-open.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav; 
  subscription: Subscription;

  constructor(private sidenavOpenService: SidenavOpenService) { 
    this.subscription = this.sidenavOpenService.getMessage()
      .subscribe(value => { this.sidenav.toggle(); });
  }

  ngOnInit() {
    this.isMobile();
  }

  mode(): string {
    if(!this.isMobile()) {
      return "side";
    }
  }

  opened(): string {
    if(!this.isMobile()) {
      return "true";
    }
  }

  isMobile(): boolean {
    if(window.innerWidth <= 960) {
      return true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
