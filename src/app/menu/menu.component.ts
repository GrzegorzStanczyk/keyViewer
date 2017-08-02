import { Component } from '@angular/core';

import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavOpenService } from '../sidenav/sidenav-open.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private sidenavComponent: SidenavComponent, private sidenavOpenService: SidenavOpenService) { }
  
  closeSidenav() {
    this.sidenavOpenService.sendMessage();
  }

  ngOnInit() {
  }

}
