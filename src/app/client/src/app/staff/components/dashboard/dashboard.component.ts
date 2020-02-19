import { Component, OnInit } from '@angular/core';
import {SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, CARD_ANIMATION, APPEAR_SIDE} from '../../../theme/app-animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, APPEAR_SIDE, CARD_ANIMATION
  ]
})
export class DashboardComponent implements OnInit {

  public qrcode: any = '';
  public showPopup = true;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.qrcode = params['qrcode'] ? params['qrcode'] : '';
      if (this.qrcode) {
        this.showPopup = false;
      }
      console.log(this.qrcode);
    });
  }

  ngOnInit() {
  }

  closePopup() {
    this.showPopup = false;
  }

}
