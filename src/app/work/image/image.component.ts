import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { animate, AnimationBuilder, style } from '@angular/animations';
//import { expandTrigger } from '../work.animation';

@Component({
  selector: 'my-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  //animations: [ expandTrigger ],
})
export class ImageComponent implements OnInit {

  @Input() image: any;
  @ViewChild('showhide') showHideEl: ElementRef;
  height: number;
  element: any;

  constructor(private animBuilder: AnimationBuilder) { }

  ngOnInit() {
    this.element = this.showHideEl.nativeElement;
    if (!this.image.showText) { // hide
      this.element.style.opacity = 0;
      this.element.style.height = 0;
    }
    this.height = this.image.thumbUrl ? 80 : this.image.text ? 18 : 0; // value comes from component css
  }

  toggle() {
    //console.log('showHide', this.image.showText, this.element.clientHeight);

    const showing = this.image.showText;
    this.image.showText = !showing;

    if (this.height === 0) return;

    const time = '0.8s ease-in-out';
    const factory = this.animBuilder.build([
      showing ? animate(time, style({ opacity: 0, height: 0 })) :
      animate(time, style({ opacity: 1, height: this.height + 'px' }))
    ]);
    const player = factory.create(this.element);
    player.play();
  }

}