import { Directive, ElementRef, HostListener, NgZone } from '@angular/core';

const duration = 1000;

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {
  startTime: number = null;
  startTop: number = null;
  progress: number = 0;

  get currentPositionY(): number { return window.pageYOffset; }

  constructor(private el: ElementRef,
    private ngZone: NgZone) {
    this.scrollABit = this.scrollABit.bind(this);
  }

  @HostListener('click') 
  onclick() {
    this.startTop = this.currentPositionY;
    this.startTime = null;
    this.ngZone.runOutsideAngular(() => { window.requestAnimationFrame(this.scrollABit); });
  }

  easing = (x) => {
    "use strict";

    if (x < 0.5) {
      return Math.pow(x * 2, 2) / 2;
    }
    return 1 - Math.pow((1 - x) * 2, 2) / 2;
  }

  scrollABit(timestamp) {
    if (!this.startTime) {
      this.startTime = timestamp;
    }

    this.progress = timestamp - this.startTime;
    const percent = (this.progress >= duration ? 1 : this.easing(this.progress/duration));
    const newY = this.startTop - Math.ceil(this.startTop * percent);
    
    window.scroll(0, newY);

    if (percent < 1) {
      this.ngZone.runOutsideAngular(() => { window.requestAnimationFrame(this.scrollABit); });
    }
  }

}