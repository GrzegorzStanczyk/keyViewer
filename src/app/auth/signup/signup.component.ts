import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

}
