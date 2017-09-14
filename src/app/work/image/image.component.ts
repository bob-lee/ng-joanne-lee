import { Component, Input } from '@angular/core';
import { expandTrigger } from '../work.animation';

@Component({
  selector: 'my-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  animations: [ expandTrigger ],
})
export class ImageComponent {

  @Input() image: any;

}