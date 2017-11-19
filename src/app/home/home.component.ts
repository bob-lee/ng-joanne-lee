import { Component, OnInit } from '@angular/core';
import { pageAnimation } from '../app.animation';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ pageAnimation ],
  // host: {'[@pageAnimation]': ''}
})
export class HomeComponent implements OnInit {
  sw: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: string) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && 'serviceWorker' in navigator) {
      this.sw = true;
    }
  }

}
