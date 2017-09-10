import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';
import { expandTrigger } from './work.animation';

@Component({
  templateUrl: './craft.component.html',
  animations: [ expandTrigger ]
})
export class CraftComponent implements OnInit {

  constructor(public imageService: ImageService) { }

  ngOnInit() {
    console.warn(`'CraftComponent'`);
    this.imageService.getImages('craft');
  }

}
