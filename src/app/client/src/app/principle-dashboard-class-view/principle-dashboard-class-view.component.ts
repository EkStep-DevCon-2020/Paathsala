import { Component, OnInit } from '@angular/core';
import {SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, CARD_ANIMATION, APPEAR_SIDE} from '../theme/app-animations';


@Component({
  selector: 'app-principle-dashboard-class-view',
  templateUrl: './principle-dashboard-class-view.component.html',
  styleUrls: ['./principle-dashboard-class-view.component.scss'],
  animations: [SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, CARD_ANIMATION, APPEAR_SIDE]
})
export class PrincipleDashboardClassViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
