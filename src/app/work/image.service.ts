import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
// import * as firebase from 'firebase';
// import { environment } from '../../environments/environment';

const PAGE_SIZE = 5; // 5 items in a page
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

  constructor(private http: Http) {
    console.info(`'image.service'`); // watch when / how often the service is instantiated
    // this.app = firebase.initializeApp(environment.firebase);
    // this.db = firebase.database();
  }

  getUrls(path: string, page: number = 1): /*firebase.*/Promise<any> {
    return this.getFullList2(path || this.group).then(() => {
      if (page > this.pages) page = 1;
      const begin = (page - 1) * PAGE_SIZE;
      this.show = this.list.slice(begin, begin + PAGE_SIZE);
      this.page = page;

      console.log(`getUrls(${page}/${this.pages}, ${this.show.length})`);
      //this.getFullList2(path || this.group);
    });
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
  private getFullList2(path: string): Promise<any> {
    if (path === this.group && this.list.length > 0)
      return Promise.resolve(this.list);

    return this.http.get(`${API}/${path}`).toPromise().then((snapshot) => {
      this.list = [];

      const items = snapshot.json();
      this.list = items.reverse();
      this.group = path;
      this.pages = Math.ceil(this.list.length / PAGE_SIZE);

      console.log(`getFullList2(${path}) got ${this.list.length} image(s)`);
      return this.list;
    });
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