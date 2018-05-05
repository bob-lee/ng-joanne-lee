import { Component, OnDestroy, OnInit, AfterViewChecked, PLATFORM_ID, Inject, NgZone } from '@angular/core';
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
    <div class="back-to-top" 
      appScroll
      [ngClass]="{'show': showIcon}">
      <i class="fa fa-step-forward fa-lg" aria-hidden="true"></i>
    </div>
    <div class="back-to-top test">
      {{info}}
    </div>
  `,
  styleUrls: ['./work.component.css'],
  animations: [routerTransition, pageAnimation],
  // host: {'[@pageAnimation]': ''}
})
export class WorkComponent implements OnInit, OnDestroy {
  loadedImages: number;
  isWindow: boolean = typeof window !== 'undefined';
  lastY: number = 0;
  ticking: boolean = false;

  get currentPositionY(): number { return window.pageYOffset; }
  get info(): number { return Math.ceil(this.lastY); }
  get showIcon(): boolean { return this.isWindow && this.lastY > 500; }

  updateLastY() {
    const newY = this.currentPositionY
    if (newY !== this.lastY) {
      this.lastY = newY
      // this.ngZone.run(() => { this.lastY = newY }) // run this inside Angular
    }
  }

  handleScroll = (e) => {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateLastY()
        this.ticking = false
      })
      this.ticking = true
    }
  }
  // handleScroll(e) {
  //   if (!this.ticking) {
  //     window.requestAnimationFrame(() => {
  //       this.updateLastY()
  //       this.ticking = false
  //     })
  //     this.ticking = true
  //   }
  // }

  // get imagesLoaded(): boolean { return /*this.loadedImages &&*/ this.imageService.show.length === this.loadedImages; }

  //private fragment: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public imageService: ImageService,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: string) {
    //this.handleScroll = this.handleScroll.bind(this)
  }

  ngOnInit() {
    console.info(`'WorkComponent'`);

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

    this.isWindow && window.addEventListener('scroll', this.handleScroll);
    //this.isWindow && this.ngZone.runOutsideAngular(() => { window.addEventListener('scroll', this.handleScroll); });
  }

  ngOnDestroy() {
    this.imageService.unobserve();

    this.isWindow && window.removeEventListener('scroll', this.handleScroll);
  }

  // ngAfterViewChecked() {
  //   try {
  //     document.querySelector('#' + this.fragment).scrollIntoView();
  //   } catch (e) { }
  // }

  loaded(image) {
    this.loadedImages++;
    this.imageService.observe(image);
    // console.log(`loaded [${image.index}], ${image.fileName}, ${this.loadedImages}`);
  }

  scrollToTop() {
    //console.log('scrollToTop', this.showIcon, this.imageService.indexToObserve, window.pageYOffset);

    window.scroll(0, 0);
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
      this.scrollToTop();
    }
  }
}
