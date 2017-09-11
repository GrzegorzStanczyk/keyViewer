import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  provider = new firebase.auth.GithubAuthProvider();
  
  constructor(public afAuth: AngularFireAuth) { 
    this.user = afAuth.authState;
  }

  signUpUser(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error))
  }

  signInUser(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response => console.log(response))
      .catch(error => console.log(error))
    };
    // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    // this.afAuth.auth.signInWithPopup(this.provider).then(function(result) {
    //   // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   // ...
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   // var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   // var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   // var credential = error.credential;
    //   // ...
    // });

  logout() {
    // this.afAuth.auth.signOut();

    this.afAuth.auth.signOut().then(function() {
      // Sign-out successful.
      console.log('Sign-out successful')
    }).catch(error => console.log(error));
  }


}
