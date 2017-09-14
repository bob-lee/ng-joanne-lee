import { animate, animation, group, query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';

export const expandAnimation = animation([
  style({ overflow: 'hidden', opacity: 0, height: 0 }),
  animate('{{ time }}', style({ opacity: 1, height: '*' }))
], { params: { time: '0.5s ease-in-out' } });

export const shrinkAnimation = animation([
  style({ opacity: 1, height: '*' }),
  animate('{{ time }}', style({ opacity: 0, height: 0, overflow: 'hidden' }))
], { params: { time: '0.5s ease-in-out' } });

export const expandTrigger = trigger('expand', [
  transition(':enter', [
    useAnimation(expandAnimation)
  ]),
  transition(':leave', [
    useAnimation(shrinkAnimation)
  ])
]);
