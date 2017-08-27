import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {

  constructor(public translate: TranslateService) {
        this.translate.addLangs(["en", "pl"]);
        this.translate.setDefaultLang('en');

        let browserLang = translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|pl/) ? browserLang : 'en');
    }

  ngOnInit() {}

}
