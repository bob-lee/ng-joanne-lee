import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  constructor() { }

  ngOnInit() { 
    this.isTouchDevice = window.matchMedia("(pointer:coarse)").matches;

    console.warn(`'ProfileComponent' ${this.isTouchDevice}`);
  }

  toggleState() {
    this.state = this.state === 'paused' ? 'running' : 'paused';
    
    if (this.isTouchDevice) {
      this.animationPlayState = this.state;
    }
  }

}
