import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {

  @Input() image: any;
  @Output() load: EventEmitter<any> = new EventEmitter();
  imageLoaded: boolean = false;

  constructor(public el: ElementRef) { }

  ngOnInit() {
  }

  loaded(image) {
    this.imageLoaded = true;
    image.element = this.el.nativeElement;
    this.load.emit(image);
  }
}
