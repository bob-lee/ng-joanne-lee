import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';
import { expandTrigger } from './work.animation';

@Component({
  templateUrl: './illustration.component.html',
  animations: [ expandTrigger ]
})
export class IllustrationComponent implements OnInit {

  constructor(public imageService: ImageService) { }

  ngOnInit() {
    console.warn(`'IllustrationComponent'`);
    this.imageService.getImages('illustration');
  }

}
