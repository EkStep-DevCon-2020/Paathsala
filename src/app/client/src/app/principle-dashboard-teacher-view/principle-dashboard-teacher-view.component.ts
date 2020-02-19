import { Component, OnInit } from '@angular/core';
import {SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, CARD_ANIMATION, APPEAR_SIDE} from '../theme/app-animations';

@Component({
  selector: 'app-principle-dashboard-teacher-view',
  templateUrl: './principle-dashboard-teacher-view.component.html',
  styleUrls: ['./principle-dashboard-teacher-view.component.scss'],
  animations: [SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, CARD_ANIMATION, APPEAR_SIDE]
})
export class PrincipleDashboardTeacherViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
