import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  private userIdSource = new Subject<string>();
  userId$ = this.userIdSource.asObservable();

  private logOutSource = new Subject<boolean>();
  logOutSource$ = this.logOutSource.asObservable();

  // user: Observable<firebase.User>;
  
  token = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {      
    afAuth.auth.onAuthStateChanged(user => {  
      if (user) {
        // User is signed in.
        // Announce user id for connect proper user database in data-storage.service
        this.announceUserId(user.uid);
        this.token = true;
      } else {
        // Announce user signout to unsubscribe database watching in data-storage.service
        this.announceUserLogOut();
      }
    });
  }

  announceUserId(userId: string) {
    this.userIdSource.next(userId);
  }

  announceUserLogOut() {
    this.logOutSource.next(true);
  }

  signUpUser(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
          this.router.navigate(['/main']);
      })
      .catch(error => console.log(error))
  }

  signInUser(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response => {
          this.router.navigate(['/main']);
      })
      .catch(error => console.log(error))
  };

  signInWithPopup(provider) {
    this.afAuth.auth.signInWithPopup(provider).then(result => {
      console.log("signInWithPopupResult", result)

    }).catch(error => {
      console.log("signInWithPopupError", error)
    });
  }

  signInUserGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.signInWithPopup(provider);
  }

  signInUserGitHub() {
    const provider = new firebase.auth.GithubAuthProvider();
    this.signInWithPopup(provider);
  }

  logOut() {
    this.announceUserLogOut();
    this.afAuth.auth.signOut()
      .then(() => {
        this.token = null;
      })
      .catch(error => console.log('logOut error', error));
  }
  
  isAuthenticated(): boolean {
    return this.token !== null;
  }
}
