import { Component, ElementRef, OnInit, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { pageAnimation } from '../app.animation';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [ pageAnimation ],
  //host: {'[@pageAnimation]': ''}
})
export class ProfileComponent implements OnInit {
  state: string = "paused";
  isTouchDevice: boolean;
  @ViewChild('background') elementRef: ElementRef;
  
  set animationPlayState(state) { this.elementRef.nativeElement.style['animation-play-state'] = state; }

  constructor(@Inject(PLATFORM_ID) private platformId: string) { }

  ngOnInit() { 
    this.isTouchDevice = isPlatformBrowser(this.platformId) ? window.matchMedia("(pointer:coarse)").matches : true;

    console.info(`'ProfileComponent' isTouchDevice=${this.isTouchDevice}`);
  }

  toggleState() {
    this.state = this.state === 'paused' ? 'running' : 'paused';
    
    if (this.isTouchDevice) {
      this.animationPlayState = this.state;
    }
  }

}
