import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { WorkComponent } from './work.component';
import { CraftComponent } from './craft.component';
import { IllustrationComponent } from './illustration.component';
import { PaintingComponent } from './painting.component';

import { ImageService } from './image.service';

export const ROUTES: Routes = [
  {
    path: '',
    component: WorkComponent,
    children: [
      { path: 'craft', component: CraftComponent },
      { path: 'illustration', component: IllustrationComponent },
      { path: 'painting', component: PaintingComponent }
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
    PaintingComponent
  ],
  providers: [ ImageService ]
})
export class WorkModule {}