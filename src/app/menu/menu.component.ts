import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
  
  closeSidenav() {
    this.closeMenu.emit(true);
  }

  ngOnInit() {
  }

}
