import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { KeySettingsComponent } from './key-settings/key-settings.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { AboutComponent } from './about/about.component';
import { KeysListComponent } from './keys-list/keys-list.component';

const routes: Routes = [
  { path: 'main',  component: MainComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'keys-list', component: KeysListComponent }, 
  { path: 'key-settings', component: KeySettingsComponent },
  { path: 'app-settings', component: AppSettingsComponent },
  { path: 'about',  component: AboutComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', redirectTo: '/main', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
