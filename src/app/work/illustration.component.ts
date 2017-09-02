import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';

@Component({
  templateUrl: './illustration.component.html',
})
export class IllustrationComponent implements OnInit {
  toShowThumb: boolean = true;

  constructor(public imageService: ImageService) {
  }

  ngOnInit() {
    console.warn(`'IllustrationComponent'`);
    this.imageService.getImages('illustration');
  }

}
