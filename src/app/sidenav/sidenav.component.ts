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
      .subscribe(() => { this.sidenav.open(); })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
