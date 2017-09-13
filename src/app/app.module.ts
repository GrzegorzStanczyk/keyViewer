import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MyOwnCustomMaterialModuleModule } from './material-module/my-own-custom-material-module.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import 'hammerjs';
import {} from '@types/googlemaps';

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
import { MapComponent } from './map/map.component';

import { AutocompleteDirective } from './map/autocomplete.directive';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { KeysListComponent } from './keys-list/keys-list.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { DataStorageService } from './data-storage.service';


export function createTranslateLoader(http: HttpClient) {
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
    KeysListComponent,
    SigninComponent,
    SignupComponent    
  ],
  entryComponents: [SignupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModuleModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FormsModule
  ],
  providers: [
    DataStorageService,
    AuthService, 
    AuthGuardService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
