import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { routerTransition, pageAnimation } from '../app.animation';

@Component({
  template: `
  <div [@routerTransition]="getState(o)" style="background-color: #eee;">
	  <router-outlet #o="outlet"></router-outlet>
  </div>
  `,
  styleUrls: ['./work.component.css'],
  animations: [ routerTransition,pageAnimation ],
  host: {'[@pageAnimation]': ''}
})
export class WorkComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(`'WorkComponent' ${this.route.firstChild}`);
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
