/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { AppModule, routes } from '../app.module';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { WorkComponent } from './work.component';
import { CraftComponent } from './craft.component';
import { IllustrationComponent } from './illustration.component';
import { PaintingComponent } from './painting.component';
import { GalleryParentComponent } from '../gallery/gallery-parent.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { ViewerComponent } from '../gallery/viewer.component';

describe('WorkComponent', () => {
  let component: WorkComponent;
  let fixture: ComponentFixture<WorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        ProfileComponent,
        WorkComponent,
        CraftComponent,
        IllustrationComponent,
        PaintingComponent,
        GalleryParentComponent,
        GalleryComponent,
        ViewerComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render in div.work', async(() => {
    let fixture = TestBed.createComponent(WorkComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.work').textContent).toContain('Joanne\'s work here');
  }));

});
