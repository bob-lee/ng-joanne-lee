import { Component, ElementRef, OnInit, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild('phone') elRef: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: string) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && !window.matchMedia("(pointer:coarse)").matches) {
      this.elRef.nativeElement.removeAttribute('href');
    }
  }

}
