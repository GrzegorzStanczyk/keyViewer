import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { KeySettingsComponent } from './key-settings/key-settings.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component'

import { MyOwnCustomMaterialModuleModule } from './material-module/my-own-custom-material-module.module';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ComponentViewerComponent } from './component-viewer/component-viewer.component';


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
    ComponentViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
