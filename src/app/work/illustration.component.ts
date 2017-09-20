import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';

@Component({
  template: `
  <div class="images">
    <my-image [image]="i" *ngFor="let i of imageService.list"></my-image>
  </div>
  `,
})
export class IllustrationComponent implements OnInit {

  constructor(public imageService: ImageService) { }

  ngOnInit() {
    console.warn(`'IllustrationComponent'`);
    this.imageService.getImages('illustration');
  }

}
