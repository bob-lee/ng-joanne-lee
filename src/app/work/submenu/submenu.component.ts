import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
  selector: 'sub-menu',
  template: `
    <div class="submenu" *ngIf="imagesLoaded && imageService.pages > 1">
      <a [ngClass]="{'hide': !imageService.hasPrev}" (click)="page(false)">< prev</a>
      <span>{{imageService.page}}/{{imageService.pages}}</span>
      <a [ngClass]="{'hide': !imageService.hasMore}" (click)="page()">more ></a>
    </div>
  `,
  styleUrls: ['./submenu.component.css']
})
export class SubmenuComponent implements OnInit {
  @Input() imagesLoaded: boolean;
  @Output() nextOrPrev: EventEmitter<boolean> = new EventEmitter();

  constructor(public imageService: ImageService) { }

  ngOnInit() {
  }

  page(next: boolean = true) {
    this.nextOrPrev.emit(next);
  }

}
