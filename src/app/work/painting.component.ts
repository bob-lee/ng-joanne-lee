import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';

@Component({
  templateUrl: './painting.component.html',
})
export class PaintingComponent implements OnInit {

  constructor(public imageService: ImageService) { }

  ngOnInit() {
    console.warn(`'PaintingComponent'`);
    this.imageService.getImages('painting');
  }

}
