import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';

export const expandAnimation = animation([
  style({ overflow: 'hidden', opacity: 0, height: 0 }),
  animate('{{ time }}', style({ opacity: 1, height: '*' }))
], { params: { time: '0.6s' } });

export const shrinkAnimation = animation([
  style({ opacity: 1, height: '*' }),
  animate('{{ time }}', style({ opacity: 0, height: 0, overflow: 'hidden' }))
], { params: { time: '0.6s' } });

export const expandTrigger = trigger('expand', [
  transition(':enter', [
    useAnimation(expandAnimation)
  ]),
  transition(':leave', [
    useAnimation(shrinkAnimation)
  ])
]);
