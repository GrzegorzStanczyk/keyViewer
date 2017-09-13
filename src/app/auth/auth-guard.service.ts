import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // if (this.authService.isAuthenticated()) { 
    //   console.log('acces allowed');
    //   return true; 
    // } else {
    //   console.log('acces not allowed');
    //   return false
    // }
  
    if (this.authService.isAuthenticated()) { return true; }

    return this.afAuth.authState
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        console.log("loggedIn", loggedIn)
        // .subscribe(loggedIn => {
        if (!loggedIn) {
          console.log("access denied")
          this.router.navigate(['/profile']);
          return false;
        }
    })


    // this.afAuth.auth.onAuthStateChanged(function(user) {
    //   if (user) {
    //     console.log('acces allowed');
    //     return true;
    //   } else {
    //     console.log("access denied")
    //     this.router.navigate(['/profile']);
    //     return false;
    //   }
    // });

  }
}
