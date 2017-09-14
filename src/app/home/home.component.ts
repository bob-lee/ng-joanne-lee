import { Component, OnInit } from '@angular/core';
import { pageAnimation } from '../app.animation';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ pageAnimation ],
  //host: {'[@pageAnimation]': ''}
})
export class HomeComponent implements OnInit {
  sw: boolean = false;

  constructor() { }

  ngOnInit() {
    if ('serviceWorker' in navigator)
      this.sw = true;
  }

}
