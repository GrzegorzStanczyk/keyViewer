import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppContent } from './content';
import { SidenavOpenService } from './sidenav/sidenav-open.service'
// import { MenuComponent } from './menu/menu.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SidenavOpenService]
})

export class AppComponent {
  content: Object = AppContent;

  constructor(private router: Router) {}
}
