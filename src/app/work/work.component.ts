import { Component, OnDestroy, OnInit, AfterViewChecked, PLATFORM_ID, Inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { routerTransition, pageAnimation } from '../app.animation';
import { ImageService } from './image.service';
import { NgScrolltopService } from 'ng-scrolltop';


/*
  <div [@routerTransition]="getState(o)" style="background-color: #eee;">
	  <router-outlet #o="outlet"></router-outlet>
  </div>
[ngClass]="{'show': imagesLoaded}"
    <pre>{{imagesLoaded}} {{count}} {{loadedImages}}</pre>
    <sub-menu [imagesLoaded]="imagesLoaded" (nextOrPrev)="page($event)"></sub-menu>

    <a id="images"></a>
    <div class="info">{{info}}</div>
    get info() { return 'scrollY=' + Math.ceil(window.pageYOffset); }
    
    <div id="imagelink"><a [routerLink]="['.']" fragment="image0">Images</a></div>
    pageScroll href="#images"
    (click)="scrollToTop()" 
    <a pageScroll href="#images">Take me to the awesomeness</a>

    <div class="back-to-top two" 
      (click)="scrollToTopSmooth()"
      [ngClass]="{'show': showIcon}">
      <i class="fa fa-step-forward fa-lg" aria-hidden="true"></i>
    </div>
    */
@Component({
  template: `
    <div class="images">
      <app-image id="{{'image'+idx}}" [image]="i" *ngFor="let i of imageService.list; let idx=index" (load)="loaded($event)"></app-image>
    </div>
    <scrolltop [bottom]="'25px'" [background]="'white'" [size]="'60px'" [sizeInner]="'36'"></scrolltop>
  `,
  styleUrls: ['./work.component.css'],
  animations: [routerTransition, pageAnimation],
  // host: {'[@pageAnimation]': ''}
})
export class WorkComponent implements OnInit, OnDestroy {
  loadedImages: number;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public imageService: ImageService,
    private ngScrolltopService: NgScrolltopService,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: string) {
  }

  ngOnInit() {
    console.info(`'WorkComponent'`);

    //this.ngScrolltopService.setDevMode();

    //this.route.fragment.subscribe(fragment => { this.fragment = fragment; });

    this.route.paramMap.subscribe(p => {
      //console.info('WorkComponent', p);

      if (p.has('name')) {
        const group = p.get('name');
        if (group !== this.imageService.group) {
          console.log(`Work group(${this.imageService.group} => ${group})`);
          this.getUrls(group);
        }
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
      window.scroll(0, 0);
    }
  }
}
