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
    let browserLang = translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|pl/) ? browserLang : 'en');
    
    if(localStorage.getItem('lang')) {
      let storageLang = JSON.parse(localStorage.getItem('lang'));
      this.translate.use(storageLang.toString());
    }
  }

  translateUse(langSelect): void {
    this.translate.use(langSelect.value)
    localStorage.setItem('lang', JSON.stringify(langSelect.value))
  }

  ngOnInit() {}
}
