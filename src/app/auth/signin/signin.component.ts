import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { MdDialog } from '@angular/material';

import { SignupComponent } from '../signup/signup.component';

import { AuthService } from '../auth.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  emailFormControl = new FormControl('', [
  Validators.required,
  Validators.pattern(EMAIL_REGEX)]);

  constructor(
    private dialog: MdDialog, 
    private authService: AuthService) { }

  onSingIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signInUser(email, password);
  }

  openRegister() {
    const dialogRef = this.dialog.open(SignupComponent, {
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSingInGoogle() {
    this.authService.signInUserGoogle();
  }

  onSingInGitHub() {
    this.authService.signInUserGitHub();
  }

  onLogOut() {
    this.authService.logOut();
  }

  ngOnInit() {
  }

}
