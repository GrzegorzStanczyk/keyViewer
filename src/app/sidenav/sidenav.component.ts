import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { SidenavOpenService } from './sidenav-open.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav;
  @ViewChild('sidenavKey') sidenavKey;  
  subscription: Subscription;
  subscriptionToKeySettings: Subscription;

  constructor(private sidenavOpenService: SidenavOpenService,
              private router: Router) { 
    this.subscriptionToKeySettings = this.sidenavOpenService.getKeySettings()
      .subscribe(() => { this.router.navigate(['/main']); })
    this.subscription = this.sidenavOpenService.getMessage()
      .subscribe(() => { this.sidenav.toggle(); });
  }

  ngOnInit() {
    // this.isMobile();
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
    this.subscriptionToKeySettings.unsubscribe();
  }
}
