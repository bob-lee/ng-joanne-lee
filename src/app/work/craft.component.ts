import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';
import { pageAnimation } from '../app.animation';

@Component({
  template: `
  <div class="images">
    <my-image [image]="i" *ngFor="let i of imageService.list"></my-image>
  </div>
  `,
})
export class CraftComponent implements OnInit {

  constructor(public imageService: ImageService) { }

  ngOnInit() {
    console.warn(`'CraftComponent'`);
    this.imageService.getImages('craft');
  }

}
