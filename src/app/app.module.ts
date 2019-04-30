import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
// import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { DropdownComponent } from './dropdown.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkComponent } from './work/work.component';
import { ImageComponent } from './work/image/image.component';
import { LoaderComponent } from './work/loader/loader.component';
import { SubmenuComponent } from './work/submenu/submenu.component';
import { NgScrolltopModule } from 'ng-scrolltop';

import { ImageService } from './work/image.service';

import { ContactComponent } from './contact/contact.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { state: 'home'} },
  { path: 'profile', component: ProfileComponent, data: { state: 'profile'} },
  { path: 'work/:name', component: WorkComponent, data: { state: 'work'} },
  { path: 'contact', component: ContactComponent, data: { state: 'contact'} },
];

@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    HomeComponent,
    ProfileComponent,
    WorkComponent,
    ImageComponent,
    LoaderComponent,
    SubmenuComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // ServiceWorkerModule,
    NgScrolltopModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
