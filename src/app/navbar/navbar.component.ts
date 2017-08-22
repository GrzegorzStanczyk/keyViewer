import { Component, OnInit  } from '@angular/core';

import { SidenavOpenService } from '../sidenav/sidenav-open.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private sidenavOpenService: SidenavOpenService) {}
  
  toggleSidenav(): void {
    this.sidenavOpenService.sendMessage();
  }

  ngOnInit() {
  }

}
