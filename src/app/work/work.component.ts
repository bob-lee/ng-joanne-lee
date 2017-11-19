import { Component, OnDestroy, OnInit, PLATFORM_ID, Inject } from '@angular/core';
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
    <sub-menu [imagesLoaded]="imagesLoaded" (nextOrPrev)="page($event)"></sub-menu>

*/
@Component({
  template: `
    <div class="images">
      <app-image [image]="i" *ngFor="let i of imageService.list" (load)="loaded($event)"></app-image>
    </div>
  `,
  styleUrls: ['./work.component.css'],
  animations: [routerTransition, pageAnimation],
  // host: {'[@pageAnimation]': ''}
})
export class WorkComponent implements OnInit, OnDestroy {
  loadedImages: number = 0;

  // get imagesLoaded(): boolean { return /*this.loadedImages &&*/ this.imageService.show.length === this.loadedImages; }

  constructor(private router: Router,
    private route: ActivatedRoute,
    public imageService: ImageService,
    @Inject(PLATFORM_ID) private platformId: string) { }

  ngOnInit() {
    console.info(`'WorkComponent'`);

    this.route.params.subscribe(params => {
      const group = params['name'];
      if (group !== this.imageService.group) {
        console.log(`Work group(${this.imageService.group} => ${group})`);
        this.getUrls(group);
      }
    });
  }

  ngOnDestroy() {
    this.imageService.unobserve();
  }

  loaded(image) {
    this.loadedImages++;
    this.imageService.observe(image);
    // console.log(`loaded [${image.index}], ${image.fileName}, ${this.loadedImages}`);
  }

  // page(next: boolean = true) {
  //   const page = this.imageService.page + (next ? 1 : -1);
  //   this.getUrls('', page);
  // }

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
