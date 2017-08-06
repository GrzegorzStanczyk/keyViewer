import { Component } from '@angular/core';

import { SidenavOpenService } from '../sidenav/sidenav-open.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private sidenavOpenService: SidenavOpenService) { }
  
  closeSidenav() {
    if(window.innerWidth <= 960) {
      this.sidenavOpenService.sendMessage();
    }
  }

  ngOnInit() {
  }

}
