import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild('phone') elRef: ElementRef;

  constructor() { }

  ngOnInit() {
    if (!window.matchMedia("(pointer:coarse)").matches) {
      this.elRef.nativeElement.removeAttribute('href');
    }
  }

}
