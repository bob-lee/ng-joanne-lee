/*
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { WorkComponent } from './work.component';
import { CraftComponent } from './craft.component';
import { IllustrationComponent } from './illustration.component';
import { PaintingComponent } from './painting.component';
import { PortraitComponent } from './portrait.component';
import { ImageComponent } from './image/image.component';

import { ImageService } from './image.service';

export const ROUTES: Routes = [
  {
    path: '',
    component: WorkComponent, 
    children: [
      { path: 'craft', component: CraftComponent, data: { state: 'craft'} },
      { path: 'illustration', component: IllustrationComponent, data: { state: 'illustration'} },
      { path: 'painting', component: PaintingComponent, data: { state: 'painting'} },
      { path: 'portrait', component: PortraitComponent, data: { state: 'portrait'} },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    WorkComponent,
    CraftComponent,
    IllustrationComponent,
    PaintingComponent,
    PortraitComponent,
    ImageComponent
  ],
  providers: [ ImageService ]
})
export class WorkModule {}
*/