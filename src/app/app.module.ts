import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import {} from '@types/googlemaps';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http, HttpModule }       from '@angular/http';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { KeySettingsComponent } from './key-settings/key-settings.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component'
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ComponentViewerComponent } from './component-viewer/component-viewer.component';
import { KeyComponent } from './key/key.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';

import { MyOwnCustomMaterialModuleModule } from './material-module/my-own-custom-material-module.module';
import { AppRoutingModule } from './app-routing.module';
import { MapComponent } from './map/map.component';
import { AutocompleteDirective } from './map/autocomplete.directive';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConnectionBackend } from '@angular/http';


export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProfileComponent,
    AppSettingsComponent,
    KeySettingsComponent,
    AboutComponent,
    MenuComponent,
    NavbarComponent,
    SidenavComponent,
    ComponentViewerComponent,
    KeyComponent,
    MapComponent,
    AutocompleteDirective,
    LanguageSwitcherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModuleModule,
    HttpModule, 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
