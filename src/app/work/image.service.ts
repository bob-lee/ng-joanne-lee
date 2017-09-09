import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment';

@Injectable()
export class ImageService {
  app: firebase.app.App;
  db: firebase.database.Database;
  list: any[] = [];

  constructor( ) {
    console.warn(`'image.service'`); // watch when / how often the service is instantiated
    this.app = firebase.initializeApp(environment.firebase);
    this.db = firebase.database();
  }

  getImages(path: string): void {
    this.list = [];
    if (!this.db) return;

    this.db.ref(path)
    .once('value').then(snapshot => {
      snapshot.forEach(item => {
        const i = item.val();
        this.list.push(i);
        //console.log(`item: ${item.key} ${i.fileName}`);
      });

      console.log(`${path} got ${this.list.length} image(s)`);
    });
  }

}