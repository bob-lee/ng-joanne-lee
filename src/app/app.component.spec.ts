/* tslint:disable:no-unused-variable */
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppModule, ROUTES } from './app.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkComponent } from './work/work.component';

describe('AppComponent (routes)', () => {
  const title = 'Joanne Lee';
  let fixture;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(ROUTES),
        AppModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });

    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have title as 'Joanne Lee'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(title);
  }));

  it('should render title in header', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header div.header-title span a').textContent).toContain(title);
  }));

  // routes
  it(`can navigate to 'home' (async)`, async(() => {
    TestBed.get(Router)
      .navigate(['/home'])
      .then(() => {
        expect(location.pathname.endsWith('/home')).toBe(true);
      }).catch(e => console.log(e));
  }));

  it(`can navigate to 'work/craft' and change titleWork properly`, fakeAsync(() => {
    const app = fixture.componentInstance;
    TestBed.get(Router)
      .navigate(['/work/craft'])
      .then(() => {
        expect(location.pathname.endsWith('/craft')).toBe(true);
      }).catch(e => console.log(e));
    fixture.detectChanges();
    tick();
    expect(app.titleWork).toBe('craft');
  }));

  it(`can navigate to 'work/illustration' and change titleWork properly`, fakeAsync(() => {
    const app = fixture.componentInstance;
    TestBed.get(Router)
      .navigate(['/work/illustration'])
      .then(() => {
        expect(location.pathname.endsWith('/illustration')).toBe(true);
      }).catch(e => console.log(e));
    fixture.detectChanges();
    tick();
    expect(app.titleWork).toBe('illustration');
  }));

  it(`can navigate to 'work/painting' and change titleWork properly`, fakeAsync(() => {
    const app = fixture.componentInstance;
    TestBed.get(Router)
      .navigate(['/work/painting'])
      .then(() => {
        expect(location.pathname.endsWith('/painting')).toBe(true);
      }).catch(e => console.log(e));
    fixture.detectChanges();
    tick();
    expect(app.titleWork).toBe('painting');
  }));

  it(`should redirect to default route 'home' (async)`, async(() => {
    TestBed.get(Router)
      .navigate([''])
      .then(() => {
        expect(location.pathname.endsWith('/home')).toBe(true);
      }).catch(e => console.log(e));
  }));
});
