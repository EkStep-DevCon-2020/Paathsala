import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
    keyframes,
    stagger,
    group,
} from '@angular/animations';

export const SLIDE_UP_DOWN = [
    trigger('slideUpDown', [
        state('1', style({
            'opacity': '1', 'visibility': 'visible'
        })),
        state('0', style({
            'opacity': '0', 'visibility': 'hidden'
        })),
        transition(':enter', [
            style({ height: 0, opacity: 0 }),
            animate('250ms ease-in', style({ height: '*' })),
            animate('300ms ease-out', style({ opacity: 1 })),
        ]),
        transition(':leave', [
            style({ height: '*', opacity: 1 }),
            animate('250ms ease-out', style({ opacity: 0 })),
            animate('300ms ease-in-out', style({ height: 0 }))
        ])
        //   state('1', style({
        //     'max-height': '*', 'opacity': '1', 'visibility': 'visible'
        //   })),
        //   state('0', style({
        //       'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
        //   })),
        //   transition('1 => 0', [group([
        //       animate('400ms ease-in-out', style({
        //           'opacity': '0'
        //       })),
        //       animate('600ms ease-in-out', style({
        //           'max-height': '0px'
        //       })),
        //       animate('700ms ease-in-out', style({
        //           'visibility': 'hidden'
        //       }))
        //   ]
        //   )]),
        //   transition('0 => 1', [group([
        //       animate('1ms ease-in-out', style({
        //           'visibility': 'visible'
        //       })),
        //       animate('600ms ease-in-out', style({
        //           'max-height': '*'
        //       })),
        //       animate('800ms ease-in-out', style({
        //           'opacity': '1'
        //       }))
        //   ]
        //   )])
    ])
];

export const FLYIN = [
    trigger('flyIn', [
        transition('* => *', [
            query(':enter', style({ opacity: 0 }), { optional: true }),
            query(':enter', stagger('300ms', [
                animate('.6s ease-in', keyframes([
                    style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                    style({ opacity: .5, transform: 'translateY(35%)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
                ]))]), { optional: true }),
            query(':leave', stagger('300ms', [
                animate('.6s ease-out', keyframes([
                    style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
                    style({ opacity: .5, transform: 'translateY(35%)', offset: 0.3 }),
                    style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
                ]))]), { optional: true })
        ])
    ])
];

export const APPEAR_DOWN = [
    trigger('appearDown', [
        // state('', style({width: 120, transform: 'translateX(0)', opacity: 1})),
        transition('void => *', [
            style({ height: 0, transform: 'translateY(10px)', opacity: 0 }),
            group([
                animate('0.15s 0.25s ease', style({
                    transform: 'translateY(0)', height: '*'
                })),
                animate('0.3s ease', style({
                    opacity: 1
                }))
            ])
        ]),
        transition('* => void', [
            style({ height: 0, transform: 'translateY(50px)', opacity: 0 }),
            group([
                animate('0.15s 0.25s ease-in-out', style({
                    transform: 'translateY(0)', height: '*'
                })),
                animate('0.3s ease-in', style({
                    opacity: 1
                }))
            ])
        ]),
    ])
];

export const APPEAR_SIDE = [
    trigger('appearSide', [
        // state('', style({width: 120, transform: 'translateX(0)', opacity: 1})),
        transition('void => *', [
            style({ width: 0, transform: 'translate(10px, 10px)', opacity: 0 }),
            group([
                animate('0.15s 0.25s ease', style({
                    transform: 'translate(0, 0)', width: '*'
                })),
                animate('0.3s ease', style({
                    opacity: 1
                }))
            ])
        ]),
        transition('* => void', [
            style({ width: 0, transform: 'translate(50px, 50px)', opacity: 0 }),
            group([
                animate('0.15s 0.25s ease-in-out', style({
                    transform: 'translate(0, 0)', width: '*'
                })),
                animate('0.3s ease-in', style({
                    opacity: 1
                }))
            ])
        ]),
    ])
];

export const CARD_ANIMATION = [
    trigger('cardAnimation', [
        // Transition from any state to any state
        transition('* => *', [
            // Initially the all cards are not visible
            query(':enter', style({ opacity: 0 }), { optional: true }),

            // Each card will appear sequentially with the delay of 300ms
            query(':enter', stagger('150ms', [
                animate('.25s ease-in', keyframes([
                    style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
                    style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
                ]))]), { optional: true }),

            // Cards will disappear sequentially with the delay of 300ms
            query(':leave', stagger('300ms', [
                animate('500ms ease-out', keyframes([
                    style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
                    style({ opacity: .5, transform: 'scale(.5)', offset: 0.3 }),
                    style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
                ]))]), { optional: true })
        ]),
    ]),

]