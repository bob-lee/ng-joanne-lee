import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
    <submenu [imagesLoaded]="imagesLoaded" (nextOrPrev)="page($event)"></submenu>
    <div class="images">
      <my-image [image]="i" *ngFor="let i of imageService.show" (load)="loaded($event)"></my-image>
    </div>
    <submenu [imagesLoaded]="imagesLoaded" (nextOrPrev)="page($event)"></submenu>
  `,
  styleUrls: ['./work.component.css'],
  animations: [routerTransition, pageAnimation],
  //host: {'[@pageAnimation]': ''}
})
export class WorkComponent implements OnInit {
  loadedImages: number = 0;

  get imagesLoaded(): boolean { return /*this.loadedImages &&*/ this.imageService.show.length === this.loadedImages; }

  constructor(private router: Router,
    private route: ActivatedRoute,
    public imageService: ImageService,
    @Inject(PLATFORM_ID) private platformId: string) { }

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

    if (isPlatformBrowser(this.platformId)) {
      // const header = document.querySelector('header');
      // if (header) header.scrollIntoView();
      window.scrollTo(0, 0);
    }
  }
}
