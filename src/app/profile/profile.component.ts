import { Component, OnInit } from '@angular/core';
import { pageAnimation } from '../app.animation';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [ pageAnimation ],
  //host: {'[@pageAnimation]': ''}
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
