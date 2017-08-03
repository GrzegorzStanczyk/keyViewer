import { Component, OnInit  } from '@angular/core';

import { AppContent } from '../content';

import { SidenavOpenService } from '../sidenav/sidenav-open.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  content: Object = AppContent;

  constructor(private sidenavOpenService: SidenavOpenService) {}
  
  toggleSidenav(): void {
    this.sidenavOpenService.sendMessage();
  }

  isMobile(): boolean {
    if(window.innerWidth <= 960) {
      return true;
    }
  }

  ngOnInit() {
  }

}
