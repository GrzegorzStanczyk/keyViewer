import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav; 

  constructor() { }

  sidenavOpen() {
    console.log(this.sidenav)
    this.sidenav.open();
  }

  ngOnInit() {
  }

}
