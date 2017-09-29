import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { routerTransition, pageAnimation } from '../app.animation';
import { ImageService } from './image.service';

/*
  <div [@routerTransition]="getState(o)" style="background-color: #eee;">
	  <router-outlet #o="outlet"></router-outlet>
  </div>
[ngClass]="{'show': imagesLoaded}"
    <pre>{{imagesLoaded}} {{count}} {{loadedImages}}</pre>

*/
@Component({
  template: `
    <div class="images">
      <my-image [image]="i" *ngFor="let i of imageService.show" (load)="loaded($event)"></my-image>
    </div>
    <div class="submenu" *ngIf="imagesLoaded">
      <a [ngClass]="{'hide': !imageService.hasPrev}" (click)="page(false)">< prev</a>
      <span>{{imageService.page}}/{{imageService.pages}}</span>
      <a [ngClass]="{'hide': !imageService.hasMore}" (click)="page()">more ></a>
    </div>
  `,
  styleUrls: ['./work.component.css'],
  animations: [routerTransition, pageAnimation],
  //host: {'[@pageAnimation]': ''}
})
export class WorkComponent implements OnInit {
  loadedImages: number = 0;

  get imagesLoaded(): boolean { return this.loadedImages && this.imageService.show.length === this.loadedImages; }

  constructor(private router: Router,
    private route: ActivatedRoute,
    public imageService: ImageService) { }

  ngOnInit() {
    console.warn(`'WorkComponent'`);

    this.route.params.subscribe(params => {
      const group = params['name'];
      if (group !== this.imageService.group) {
        console.log(`Work group(${this.imageService.group} => ${group})`);
        this.getUrls(group);
      }
    });
  }

  loaded($event) {
    this.loadedImages++;
    //console.log('loaded', $event, this.loadedImages, this.imageService.show.length);
  }

  page(next: boolean = true) {
    const page = this.imageService.page + (next ? 1 : -1);
    this.getUrls('', page);
  }

  private getUrls(path, page = 1) {
    this.loadedImages = 0;
    this.imageService.getUrls(path, page);

    // const header = document.querySelector('header');
    // if (header) header.scrollIntoView();
    window.scrollTo(0, 0);
  }

  /*
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
  */
}
