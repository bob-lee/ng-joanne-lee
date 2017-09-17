import { animate, animation, group, query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';

export const expandAnimation = animation([
  style({ overflow: 'hidden', opacity: 0, height: 0 }),
  animate('{{ time }}', style({ opacity: 1, height: '*' }))
], { params: { time: '0.8s ease-in-out' } });

export const shrinkAnimation = animation([ // why this looks so expensive on ngIf?
  style({ opacity: 1, height: '*' }),
  group([
    animate('0.4s', style({ opacity: 0 })),
    animate('0.8s', style({ height: 0, overflow: 'hidden' }))
  ])
  //animate('{{ time }}', style({ opacity: 0, height: 0, overflow: 'hidden' }))
], { params: { time: '0.8s' } });

export const expandTrigger = trigger('expand', [
  transition(':enter', [
    useAnimation(expandAnimation)
  ]),
  transition(':leave', [
    useAnimation(shrinkAnimation)
  ])
]);
