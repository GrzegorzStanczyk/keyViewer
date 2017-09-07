import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SidenavOpenService } from './sidenav-open.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild('sidenavMenu') sidenavMenu;
  @ViewChild('sidenavKeySettings') sidenavKeySettings;  

  subscriptionToMenu: Subscription;
  subscriptionToKeySettings: Subscription;

  constructor(private sidenavOpenService: SidenavOpenService) { 
    // this.subscriptionToKeySettings = this.sidenavOpenService.getKeySettings()
    //   .subscribe(() => { this.router.navigate(['/main']); })
    this.subscriptionToMenu = this.sidenavOpenService.toggleSidenavMenu$
      .subscribe(() => { this.sidenavMenu.toggle(); });
    this.subscriptionToKeySettings = this.sidenavOpenService.toggleSidenavKeySettingsSource$
    .subscribe(() => { this.sidenavKeySettings.toggle(); });
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

  ngOnInit() {
    // this.isMobile();
  }
  
  ngOnDestroy() {
    this.subscriptionToMenu.unsubscribe();
    this.subscriptionToKeySettings.unsubscribe();
  }
}
