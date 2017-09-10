import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';
import { expandTrigger } from './work.animation';

@Component({
  templateUrl: './painting.component.html',
  animations: [ expandTrigger ]
})
export class PaintingComponent implements OnInit {

  constructor(public imageService: ImageService) { }

  ngOnInit() {
    console.warn(`'PaintingComponent'`);
    this.imageService.getImages('painting');
  }

}
