import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { KeysListComponent } from '../keys-list/keys-list.component';


@Component({
  selector: 'app-delete-message',
  templateUrl: './delete-message.component.html',
  styleUrls: ['./delete-message.component.scss']
})
export class DeleteMessageComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<KeysListComponent>) { }
  
  ngOnInit() {
  }

}
