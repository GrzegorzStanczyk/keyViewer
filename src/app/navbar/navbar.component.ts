import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { AppContent } from '../content';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() open: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  content: Object = AppContent;

  constructor() { }
  
  sidenavOpen() {
    this.open.emit(true);
  }

  ngOnInit() {
  }

}
