import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sw: boolean = false;

  constructor() { }

  ngOnInit() {
    if ('serviceWorker' in navigator)
      this.sw = true;
  }

}
