import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';

@Component({
  templateUrl: './craft.component.html',
})
export class CraftComponent implements OnInit {

  constructor(public imageService: ImageService) { }

  ngOnInit() {
    console.warn(`'CraftComponent'`);
    this.imageService.getImages('craft');
  }

}
