import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';
import { pageAnimation } from '../app.animation';

@Component({
  template: `
  <div class="images">
    <my-image [image]="i" *ngFor="let i of imageService.list"></my-image>
  </div>
  `,
  animations: [ pageAnimation ],
})
export class PortraitComponent implements OnInit {
  
  constructor(public imageService: ImageService) { }

  ngOnInit() {
    console.warn(`'PortraitComponent'`);
    this.imageService.getImages('portrait');
  }

}
