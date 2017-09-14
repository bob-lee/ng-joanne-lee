import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';
import { pageAnimation } from '../app.animation';

@Component({
  templateUrl: './craft.component.html',
  animations: [ pageAnimation ],
  //host: {'[@pageAnimation]': ''}
})
export class CraftComponent implements OnInit {

  constructor(public imageService: ImageService) { }

  ngOnInit() {
    console.warn(`'CraftComponent'`);
    this.imageService.getImages('craft');
  }

}
