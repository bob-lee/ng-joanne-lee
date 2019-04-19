import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
//import { listPortrait } from './image.service.spec';

const PAGE_SIZE = 5; // 5 items in a page
const INTERSECT_PAGESIZE = 2;
const API = 'https://us-central1-joanne-lee.cloudfunctions.net/getUrls';
/*
export enum OrderBy {
  key,
  fileName
}
*/

@Injectable()
export class ImageService {
  // app: firebase.app.App;
  // db: firebase.database.Database;
  list: any[] = [];
  show: any[] = []; // paged subset of list to show
  group: string;
  page: number = 1; // starting from 1
  pages: number = 1;
  get hasPrev() { return this.list.length > 0 && this.page > 1; }
  get hasMore() { return this.list.length > 0 && this.page < this.pages; }

  /*
    try lazy-loading offscreen images using IntersectionObserver API:

    1. Rather than trying to write a generic demo, focus on what's needed here (work.component).
    2. Keep observing only one element all the time.
    3. This service decides which element to observe by index.
    4. The component tells which element to observe.
    5. The service provides urls accordingly.

  */
  intersectionObserver: IntersectionObserver;
  intersectionRatio: number;
  elementToObserve: Element;
  private _indexToObserve: number; // only to grow from 0 as scrolling down
  get indexToObserve() { return this._indexToObserve; }
  set indexToObserve(value) {
    const len = this.list.length;
    if (!value || value <= this._indexToObserve || value >= len) {
      console.error(`indexToObserve(${value})`);
      return;
    }

    this._indexToObserve = value;

    // update 'toLoad' to load more images
    for (let i = 0; i < INTERSECT_PAGESIZE; i++) {
      const index = this._indexToObserve + i;
      if (index === len) { return };
      this.list[index].toLoad = true;
    }
  }

  constructor(private http: HttpClient) {
    try {
      this.intersectionObserver = new IntersectionObserver(entries => {
        const entry = entries[0];
        const currentRatio = this.intersectionRatio;
        const newRatio = entry.intersectionRatio;
        const boundingClientRect = entry.boundingClientRect;
        const scrollingDown = currentRatio !== undefined && newRatio < currentRatio &&
          boundingClientRect.bottom < boundingClientRect.height;

        this.intersectionRatio = newRatio;

        if (scrollingDown) {
          const i = this.indexToObserve + INTERSECT_PAGESIZE;
          this.unobserve();
          this.indexToObserve = i;
          console.info(`${currentRatio} -> ${newRatio} [${i}]`);
        }

        // console.log(entry);
        // console.log(entry.intersectionRatio);
      }, { threshold: [ 0, 0.25, 0.5, 0.75, 1 ]});
    } catch (e) {
      console.error(`failed to create IntersectionObserver:`, e);
    }

    console.info(`'image.service' ${!!this.intersectionObserver}`); // watch when / how often the service is instantiated
    // this.app = firebase.initializeApp(environment.firebase);
    // this.db = firebase.database();
  }

  observe(me: any) { // observe new element, me
    if (!me || !me.element || me.index === undefined) {
      console.warn(`observe() invalid input: ${me}`);
      return;
    }

    if (me.index === this.indexToObserve) {
      this.elementToObserve = me.element;
      this.intersectionObserver.observe(me.element);
      console.info(`elementToObserve = ${me.index}`);
    } else {
      console.log(`observe(${me.index} !== ${this.indexToObserve})`);
    }
  }

  unobserve() { // unobserve current element
    if (this.elementToObserve) {
      this.intersectionObserver.unobserve(this.elementToObserve);
      this.intersectionRatio = undefined;
      console.info(`unobserve [${this.indexToObserve}]`);
    } else {
      console.log(`null elementToObserve`);
    }
  }

  async getUrls0(path: string, page: number = 1) {
    if (path === this.group && this.list.length > 0) {
      return;
    }

    const list = await this.getFullList2(path || this.group).pipe(take(1))
      .forEach((items) => this.applyToList(items, path));
    
    return list;
  }
  getUrls(path: string, page: number = 1): Observable<any[]> {
    if (path === this.group && this.list.length > 0) {
      return;
    }

    const sub$ = this.getFullList2(path || this.group);
    sub$.subscribe(items => this.applyToList(items, path));
    return sub$;
  }

  private applyToList(items, path): any[] {
    this.list = [];

    // prepare a list for intersection observer
    this._indexToObserve = 0;
    //const items = snapshot;//.json();
    this.list = items.reverse().map((item, index) => {
      /* provide 2 additional properties for each image:
            toLoad: boolean, the component to load image,
            index: number, the component to call observe(item) on image loaded
       */
      item.toLoad = index < (this.indexToObserve + INTERSECT_PAGESIZE);
      item.index = index;
      return item;
    });
    this.group = path;
    this.pages = Math.ceil(this.list.length / PAGE_SIZE);

    console.log(`getUrls(${path}) got ${this.list.length} image(s)`);

    return this.list;
  }

  /*
  private getFullList(path: string): firebase.Promise<any[]> {
    if (path === this.group && this.list.length > 0)
      return firebase.Promise.resolve(this.list);
    return this.db.ref(path)
      .once('value').then(snapshot => {
        this.list = [];
        snapshot.forEach(item => {
          const i = item.val();
          i.showText = true;
          this.list.push(i);
        });
        this.list = this.list.reverse(); // latest first
        this.group = path;
        this.pages = Math.ceil(this.list.length / PAGE_SIZE);
        console.log(`getFullList(${path}) got ${this.list.length} image(s)`);
      });
  }
  */
  private getFullList2(path: string): Observable<any[]> {

    return this.http.get<any[]>(`${API}/${path}`);
  }

  /*
  getImages(path: string): void {
    this.list = [];
    //if (!this.db) return;

    this.db.ref(path)
      .once('value').then(snapshot => {
        snapshot.forEach(item => {
          const i = item.val();
          i.showText = true;
          this.list.push(i);
        });

        console.log(`${path} got ${this.list.length} image(s)`);
      });
  }

  // Server side pagination tried below

  headKey: string;
  tailKey: string;
  get prev() { return this.page < 2 ? '' : '< prev'; }
  get more() { return this.tailKey ? 'more >' : ''; }

  get isFirstPage() { return !this.headKey && !this.tailKey; }

  getImagesPagedByKey(path: string, next: boolean = true): void {
    if (this.list.length > 0 && !next && this.page === 1) {
      console.warn('first page!');
      return;
    }
    if (this.list.length > 0 && next && !this.tailKey) {
      console.warn('last page!');
      return;
    }
    this.list = [];
    if (!this.db) return;

    let q: firebase.database.Query;

    if (this.page === 0) { // first page
      this.db.ref(path)
        .limitToFirst(PAGE_SIZE + 1)
        .once('value').then(snapshot => this.copy(path, next, snapshot));
    } else if (next && this.tailKey) { // next page
      this.db.ref(path)
        .orderByKey()
        .startAt(this.tailKey)
        .limitToFirst(PAGE_SIZE + 1)
        .once('value').then(snapshot => this.copy(path, next, snapshot));
    } else if (!next && this.headKey) { // previous page
      this.db.ref(path)
        .orderByKey()
        .endAt(this.headKey)
        .limitToLast(PAGE_SIZE + 1)
        .once('value').then(snapshot => this.copy(path, next, snapshot));
    } else { // shouldn't be here
      console.error(`getImagesPagedByKey(${path}[${this.page}], ${next}, ${this.headKey}, ${this.tailKey})`);
    }
  }

  private getKey(item: any, orderBy: OrderBy): any {
    return orderBy === OrderBy.key ? item.key :
      orderBy === OrderBy.fileName ? item.val().fileName :
        '';
  }

  private copy(path: string, next: boolean, snapshot: any, orderBy: OrderBy = OrderBy.key): void {
    let count = 0;
    snapshot.forEach(item => {
      const i = item.val();
      let firstKey;
      i.showText = true;
      if (++count <= PAGE_SIZE) {
        if (count === 1) this.headKey = this.getKey(item, orderBy);
        this.list.push(i);
      } else {
        console.log('last item,', i.fileName);
        this.tailKey = this.getKey(item, orderBy);
      }
    });

    if (count < PAGE_SIZE) this.tailKey = '';

    this.page = this.page + (next ? 1 : -1);

    console.log(`${path}[${this.page}] got ${this.list.length} image(s), head=${this.headKey}, tail=${this.tailKey}`);
  }

  getImagesPagedByName(path: string, next: boolean = true): void {
    if (this.list.length > 0 && !next && this.page === 1) {
      console.warn('first page!');
      return;
    }
    if (this.list.length > 0 && next && !this.tailKey) {
      console.warn('last page!');
      return;
    }
    this.list = [];
    if (!this.db) return;

    let q: firebase.database.Query;

    if (this.page === 0) { // first page
      this.db.ref(path)
        .orderByChild("fileName")
        .limitToFirst(PAGE_SIZE + 1)
        .once('value').then(snapshot => this.copy(path, next, snapshot, OrderBy.fileName));
    } else if (next && this.tailKey) { // next page
      this.db.ref(path)
        .orderByChild("fileName")
        .startAt(this.tailKey)
        .limitToFirst(PAGE_SIZE + 1)
        .once('value').then(snapshot => this.copy(path, next, snapshot, OrderBy.fileName));
    } else if (!next && this.headKey) { // previous page
      this.db.ref(path)
        .orderByChild("fileName")
        .endAt(this.headKey)
        .limitToLast(PAGE_SIZE + 1)
        .once('value').then(snapshot => this.copy(path, next, snapshot, OrderBy.fileName));
    } else { // shouldn't be here
      console.error(`getImagesPagedByName(${path}[${this.page}], ${next}, ${this.headKey}, ${this.tailKey})`);
    }
  }
  */
}
