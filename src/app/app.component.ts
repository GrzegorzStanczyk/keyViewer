import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppContent } from './content';
// import { MenuComponent } from './menu/menu.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  
})

export class AppComponent {
  content: Object = AppContent;
  toggleNav: boolean = false;
  toggleButton: boolean = true;

  constructor(private router: Router) {}

  gotoProfile(): void {
    this.router.navigate(['/profile']);
  }

  gotoMain(): void {
    this.router.navigate(['/main']);
  }

  isCloseMenu(isClose: boolean) {
    this.toggleNav = !isClose;
  }
}
