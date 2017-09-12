import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';

import { MdDialogRef } from '@angular/material';

import { AuthService } from '../auth.service';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  emailFormControl = new FormControl('', [
  Validators.required,
  Validators.pattern(EMAIL_REGEX)]);

  constructor(
    private authService: AuthService,
    public dialogRef: MdDialogRef<SignupComponent>) { }
  
  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    
    this.authService.signUpUser(email, password);
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
