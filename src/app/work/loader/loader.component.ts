import { Component } from '@angular/core';

@Component({
  selector: 'loader',
  template: `
    <div class="loader">Loading...</div>
  `,
  styles: [`
    @keyframes loader {
      to {
          background-position: -312px 0;
      }
    }
    
    .loader {
      margin: 0 auto;
      width: 26px;
      height: 26px;
      text-indent: 999px;
      overflow: hidden;
      background: url('/assets/img/loader.png') 0 0;
      animation: loader 1.2s infinite steps(12);
    }
  `],
})
export class LoaderComponent {
}