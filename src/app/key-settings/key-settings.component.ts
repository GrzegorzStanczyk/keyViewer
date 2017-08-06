import { Component, OnInit} from '@angular/core';

import { slideInDownAnimation, slideInOutAnimation, slideToTop } from '../router.animations';

import { SidenavOpenService } from '../sidenav/sidenav-open.service';

@Component({
  selector: 'app-key-settings',
  templateUrl: './key-settings.component.html',
  styleUrls: ['./key-settings.component.scss'],
  animations: [slideToTop],
  host: { '[@routerTransition]': '' }
})
export class KeySettingsComponent implements OnInit {

  constructor(private sidenavOpenService: SidenavOpenService) { }

  closeAndGoToMain() {
    this.sidenavOpenService.sendKeySettings();
  }

  ngOnInit() {
  }

}
