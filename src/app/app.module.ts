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
import { ImageComponent } from './work/image/image.component';

import { ImageService } from './work/image.service';

import { ContactComponent } from './contact/contact/contact.component';
import 'hammerjs/hammer';

const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { state: 'home'} },
  { path: 'profile', component: ProfileComponent, data: { state: 'profile'} },
  { path: 'work/:name', component: WorkComponent, data: { state: 'work'} },
  //{ path: 'work', loadChildren: './work/work.module#WorkModule' },
  /*
  { 
    path: 'work',
    component: WorkComponent,
    children: [
      { path: 'illustration', component: IllustrationComponent, data: { state: 'illustration'} },
      { path: 'painting', component: PaintingComponent, data: { state: 'painting'} },
      { path: 'portrait', component: PortraitComponent, data: { state: 'portrait'} },
    ]
  },
  */
  { path: 'contact', component: ContactComponent, data: { state: 'contact'} },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    WorkComponent,
    ImageComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ServiceWorkerModule,
    RouterModule.forRoot(ROUTES/*, { preloadingStrategy: PreloadAllModules }*/)
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
