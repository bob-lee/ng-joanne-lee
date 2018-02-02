/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  Component,
  DebugElement,
  Injectable,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ParamMap,
  convertToParamMap,
  NavigationExtras
} from '@angular/router';
import { ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { WorkComponent } from './work.component';
import { ImageService } from './image.service';

@Injectable()
export class RouterStub {
  navigate(commands: any[], extras?: NavigationExtras) { }
}

@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.paramMap is Observable
  private subject = new BehaviorSubject(convertToParamMap(this.testParamMap));
  paramMap = this.subject.asObservable();

  // Test parameters
  private _testParamMap: ParamMap;
  get testParamMap() { return this._testParamMap; }
  set testParamMap(params: {}) {
    this._testParamMap = convertToParamMap(params);
    this.subject.next(this._testParamMap);
  }

  // ActivatedRoute.snapshot.paramMap
  get snapshot() {
    return { paramMap: this.testParamMap };
  }
}

class ImageServiceSpy {
  list = [];
  group: '';
  observe = jasmine.createSpy('observe');
  unobserve = jasmine.createSpy('unobserve');
  getUrls = jasmine.createSpy('getUrls').and.callFake(
    (path: string, page: number) => Promise.resolve('fake getUrls resolved')
  );
}

@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent { }

let component: WorkComponent;
let fixture: ComponentFixture<WorkComponent>;
let activatedRoute: ActivatedRouteStub;
let imageService: ImageService;
let imageServiceSpy: ImageServiceSpy;

function createComponent() {
  fixture = TestBed.createComponent(WorkComponent);
  component = fixture.componentInstance;
  imageServiceSpy = fixture.debugElement.injector.get(ImageService) as any;

  fixture.detectChanges();
}

describe('WorkComponent', () => {
  let imageServiceStub: {
    group: string,
    observe: (any) => void,
    unobserve: () => void,
    getUrls: (path: string, page: number) => Promise<any>
  }

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    imageServiceStub = {
      group: '',
      observe: (any) => { },
      unobserve: () => { },
      getUrls: (path: string, page: number) => Promise.resolve('fake getUrls resolved')
    }

    TestBed.configureTestingModule({
      declarations: [
        WorkComponent,
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ImageService, useClass: ImageServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  it('should create the component', () => {
    createComponent();
    expect(component).toBeTruthy();
    expect(component.loadedImages).not.toBeDefined();
    expect(imageServiceSpy.getUrls.calls.count()).toBe(0, 'getUrls not called');
  });

  it('should call ImageService.getUrls() on init', () => {
    activatedRoute.testParamMap = { name: 'my group' };

    createComponent();
    expect(component).toBeTruthy();
    expect(component.loadedImages).toBe(0);
    expect(imageServiceSpy.getUrls.calls.count()).toBe(1, 'getUrls called once');
  });

  it('should call ImageService.unobserve() on destroy', () => {
    activatedRoute.testParamMap = { name: 'my group' };

    createComponent();
    fixture.destroy();
    expect(imageServiceSpy.unobserve).toHaveBeenCalled();
  });
});
