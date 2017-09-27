import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkComponent } from './work/work.component';
//import { CraftComponent } from './work/craft.component';
import { IllustrationComponent } from './work/illustration.component';
import { PaintingComponent } from './work/painting.component';
import { PortraitComponent } from './work/portrait.component';
import { ImageComponent } from './work/image/image.component';

import { ImageService } from './work/image.service';

import { ContactComponent } from './contact/contact/contact.component';
//import { GalleryParentComponent } from './gallery/gallery-parent.component';
//import { Angular2ImageGalleryModule } from 'angular2-image-gallery';

//import 'web-animations-js/web-animations.min';
import 'hammerjs/hammer';

// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/set';

const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { state: 'home'} },
  { path: 'profile', component: ProfileComponent, data: { state: 'profile'} },
  //{ path: 'work', loadChildren: './work/work.module#WorkModule' },
  { 
    path: 'work',
    component: WorkComponent,
    children: [
      //{ path: 'craft', component: CraftComponent, data: { state: 'craft'} },
      { path: 'illustration', component: IllustrationComponent, data: { state: 'illustration'} },
      { path: 'painting', component: PaintingComponent, data: { state: 'painting'} },
      { path: 'portrait', component: PortraitComponent, data: { state: 'portrait'} },
    ]
  },
  { path: 'contact', component: ContactComponent, data: { state: 'contact'} },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    WorkComponent,
    ImageComponent,
    IllustrationComponent,
    PaintingComponent,
    PortraitComponent,

    //GalleryParentComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ServiceWorkerModule,
    //Angular2ImageGalleryModule,
    RouterModule.forRoot(ROUTES/*, { preloadingStrategy: PreloadAllModules }*/)
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
