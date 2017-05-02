/* tslint:disable:no-unused-variable */

import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppModule, routes } from './app.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkComponent } from './work/work.component';
import { CraftComponent } from './work/craft.component';
import { IllustrationComponent } from './work/illustration.component';
import { PaintingComponent } from './work/painting.component';
import { GalleryParentComponent } from './gallery/gallery-parent.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ViewerComponent } from './gallery/viewer.component';
/*
describe('AppComponent', () => {
  const title = 'Joanne Lee';

  beforeEach(() => {
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
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have title as 'Joanne Lee'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(title);
  }));

  it('should render title in header', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header div.header-title span a').textContent).toContain(title);
  }));

});
*/
describe('AppComponent (routes)', () => {
  const title = 'Joanne Lee';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AppModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have title as 'Joanne Lee'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(title);
  }));

  it('should render title in header', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header div.header-title span a').textContent).toContain(title);
  }));

  // routes
  it('can navigate to home (async)', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    TestBed.get(Router)
      .navigate(['/home'])
      .then(() => {
        expect(location.pathname.endsWith('/home')).toBe(true);
      }).catch(e => console.log(e));
  }));

  it('can navigate to craft and change titleWork properly', fakeAsync(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.componentInstance;
    TestBed.get(Router)
      .navigate(['/work/craft'])
      .then(() => {
        expect(location.pathname.endsWith('/craft')).toBe(true);
      }).catch(e => console.log(e));
    fixture.detectChanges();
    tick();
    expect(app.titleWork).toBe('craft');
  }));

  it('can navigate to illustration and change titleWork properly', fakeAsync(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.componentInstance;
    TestBed.get(Router)
      .navigate(['/work/illustration'])
      .then(() => {
        expect(location.pathname.endsWith('/illustration')).toBe(true);
      }).catch(e => console.log(e));
    fixture.detectChanges();
    tick();
    expect(app.titleWork).toBe('illustration');
  }));

  it('can navigate to painting and change titleWork properly', fakeAsync(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.componentInstance;
    TestBed.get(Router)
      .navigate(['/work/painting'])
      .then(() => {
        expect(location.pathname.endsWith('/painting')).toBe(true);
      }).catch(e => console.log(e));
    fixture.detectChanges();
    tick();
    expect(app.titleWork).toBe('painting');
  }));

  it('can navigate to gallery (async)', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    TestBed.get(Router)
      .navigate(['/work/gallery'])
      .then(() => {
        expect(location.pathname.endsWith('/gallery')).toBe(true);
      }).catch(e => console.log(e));
  }));

  it('default route redirects to home (async)', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let router = TestBed.get(Router);
    router.initialNavigation(); // triggers default

    fixture.whenStable().then(() => {
      let path = location.pathname;
      console.log(path);
      expect(location.pathname.endsWith('/home')).toBe(true);
    });
  }));

});
