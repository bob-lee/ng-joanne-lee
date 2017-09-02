import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkComponent } from './work/work.component';
import { CraftComponent } from './work/craft.component';
import { IllustrationComponent } from './work/illustration.component';
import { PaintingComponent } from './work/painting.component';
import { GalleryParentComponent } from './gallery/gallery-parent.component';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';
import { ImageService } from './work/image.service';

import 'web-animations-js/web-animations.min';
import 'hammerjs/hammer';

import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';

import 'web-animations-js';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'work',
    component: WorkComponent,
    children: [
      { path: 'craft', component: CraftComponent },
      { path: 'illustration', component: IllustrationComponent },
      { path: 'painting', component: PaintingComponent }
    ]
  },
  { path: 'gallery', component: GalleryParentComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    WorkComponent,
    CraftComponent,
    IllustrationComponent,
    PaintingComponent,
    GalleryParentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ServiceWorkerModule,
    Angular2ImageGalleryModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
