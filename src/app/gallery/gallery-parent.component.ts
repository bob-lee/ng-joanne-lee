import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <gallery (viewerChange)="onViewerVisibilityChanged($event)"
           [galleryName]="''">
  </gallery>
  `
})
export class GalleryParentComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  onViewerVisibilityChanged(isVisible: boolean) {
    console.log('viewer visible: ' + isVisible)
  }
}
