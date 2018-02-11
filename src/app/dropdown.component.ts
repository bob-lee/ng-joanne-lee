import { Component, OnInit, EventEmitter, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dropdown',
  template: `
    <div class="ddm" routerLinkActive="active">
      <input type="checkbox" id="ddm-1" [checked]="checked" (change)="handleChange($event)">
      <label for="ddm-1" class="header-menu-item">{{titleWork}}</label>
      <i class="fa fa-angle-right fa-lg" aria-hidden="true"></i>
      <div class="dd" (click)="handleOverlay()">
        <a routerLink="/work/portrait" routerLinkActive="active">portrait</a>
        <a routerLink="/work/painting" routerLinkActive="active">painting</a>
        <a routerLink="/work/illustration" routerLinkActive="active">illustration</a>
      </div>
      <div class="overlay" (click)="handleOverlay()">
      </div>
    </div>
  `,
  //styleUrls: ['./dropdown.component.css'],
  //encapsulation: ViewEncapsulation.None 
})
export class DropdownComponent implements OnInit {
  @Input() titleWork: string;
  checked: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  handleOverlay() {
    console.log('handleOverlay', this.checked);
    this.checked = false;
  }

  handleChange(e) {
    e.preventDefault();
    console.log('handleChange', e.target.checked);
    this.checked = true;
  }

}
