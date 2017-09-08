import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';

import { SignupComponent } from '../signup/signup.component';

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

  constructor(public dialog: MdDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(SignupComponent, {
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
  }

}
