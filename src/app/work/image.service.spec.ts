/* tslint:disable:no-unused-variable */
import { async, getTestBed, TestBed } from '@angular/core/testing';
// import {
//   Headers, BaseRequestOptions,
//   Response, HttpModule, Http, XHRBackend, RequestMethod,
//   ResponseOptions
// } from '@angular/http';
//import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ImageService } from './image.service';
//import 'jasmine';

export const listPortrait = [
  {
    fileName: 'portrait1.jpg',
    url: '/portrait1.jpg',
    thumbUrl: '/portrait1_thumb.jpg',
    text: 'portrait1_text',
  },
]

//describe('ImageService', () => {});

describe('ImageService', () => {
  // let mockBackend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ImageService,
        // MockBackend,
        // BaseRequestOptions,
        // {
        //   provide: Http,
        //   deps: [MockBackend, BaseRequestOptions],
        //   useFactory:
        //     (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
        //       return new Http(backend, defaultOptions);
        //     }
        // }
      ],
      imports: [
        // HttpModule
      ]
    });
    // mockBackend = getTestBed().get(MockBackend);
  }));

  it('should get urls', (done) => {
    let service: ImageService;

    getTestBed().compileComponents().then(() => {
      // mockBackend.connections.subscribe(
      //   (connection: MockConnection) => {
      //     connection.mockRespond(new Response(
      //       new ResponseOptions({
      //         body: listPortrait
      //       })
      //     ));
      //   });

      service = getTestBed().get(ImageService);
      expect(service).toBeDefined();

      service.getUrls('portrait').subscribe(list => {
        expect(list.length).toBeDefined();
        expect(list.length).toEqual(1);
        expect(list[0].fileName).toEqual('portrait1.jpg');
        done();
      });

      // service.getUrls('portrait').then(list => {
      //   expect(list.length).toBeDefined();
      //   expect(list.length).toEqual(1);
      //   expect(list[0].fileName).toEqual('portrait1.jpg');
      //   done();
      // });
    });
  });
});
