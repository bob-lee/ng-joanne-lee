import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './painting.component.html',
})
export class PaintingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.warn(`'PaintingComponent'`);
  }

}
