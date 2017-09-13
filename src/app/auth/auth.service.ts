import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  token = null;
  

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {
      
    // this.user = afAuth.authState;
    afAuth.auth.onAuthStateChanged(user => {      
      if (user) {
        // User is signed in.
        this.token = true;
        // this.router.navigate(['/main']);
        console.log("loegedin", this.token)
      } else {
        // this.router.navigate(['/profile']);
        // No user is signed in.
        console.log("loggedout", this.token)
        
      }
    });

    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.token = currentUser && currentUser.token;
  }

  signUpUser(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        // return this.afAuth.auth.currentUser.getIdToken()
        //   .then(token => {
        //     // localStorage.setItem('currentUser', JSON.stringify({ username: response.email, token: token }));
        //     this.token = token;
        //     this.router.navigate(['/main']);
        //   });
          this.router.navigate(['/main']);
          
      })
      .catch(error => console.log(error))
  }

  signInUser(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        // return this.afAuth.auth.currentUser.getIdToken()
        //   .then(token => {
        //     // localStorage.setItem('currentUser', JSON.stringify({ username: response.email, token: token }));
        //     // this.token = token;
        //     this.router.navigate(['/main']);
        //   });
          this.router.navigate(['/main']);
      })
      .catch(error => console.log(error))
  };

  signInWithPopup(provider) {
    this.afAuth.auth.signInWithPopup(provider).then(result => {
      console.log("signInWithPopupResult", result)
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
    }).catch(error => {
      console.log("signInWithPopupError", error)
      var errorMessage = error.message;
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
    this.afAuth.auth.signOut().then(() => {
      this.token = null;
      localStorage.removeItem('currentUser');
    })
      .catch(error => console.log(error));
  }
  
  isAuthenticated(): boolean {
    return this.token !== null;
  }

  // get currentUserObservable(): any {
  //   return this.afAuth.authState;
  // }
}
