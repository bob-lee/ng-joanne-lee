import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
// import { NgServiceWorker } from '@angular/service-worker';
import { filter } from 'rxjs/operators';
import { routerTransition } from './app.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ routerTransition ],
})
export class AppComponent implements OnInit {
  title = 'Joanne Lee';
  titleWork = 'work';
  // showIt: boolean = false; // hide it

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    /*public sw: NgServiceWorker*/) { }

  ngOnInit() {
    // gentle app update flow
    // this.sw.updates.subscribe(event => {
    //   console.log('sw.updates:', event.type, event);
    //   /*

    //   if (event.type === 'pending') {
    //     // ask user if they want to update?
    //     let agreeToUpdate: boolean = true;
    //     if (agreeToUpdate) {
    //       sw.activateUpdate(event.version);
    //     }

    //   } else {
    //     // event type === 'activation
    //     // MGSW is now serving a new version
    //     location.reload();
    //   }
    //   */

    // });


    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('NavigationEnd', event);

        this.titleWork = event.url.endsWith('craft') ? 'craft' :
          event.url.endsWith('illustration') ? 'illustration' :
          event.url.endsWith('painting') ? 'painting' :
          event.url.endsWith('portrait') ? 'portrait' :
          'work';
        /*
        if (this.showIt) { // showing
          this.showIt = false; // hide it
        }
        */
      });
  }
  /*
  clicked() {
    console.log('clicked');
    this.showIt = !this.showIt;
  }
  */

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
