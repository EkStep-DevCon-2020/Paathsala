import {Component, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';
import {Router} from '@angular/router';
import {SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, CARD_ANIMATION, APPEAR_SIDE} from '../../../theme/app-animations';

@Component({
  selector: 'app-profile-selection',
  templateUrl: './profile-selection.component.html',
  styleUrls: ['./profile-selection.component.scss'],
  animations: [
    SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, APPEAR_SIDE, CARD_ANIMATION
  ]
})
export class ProfileSelectionComponent implements OnInit {

  public defaultProfileImg = './assets/images/default-profile.png';
  public teacherList;

  constructor(private dataService: DataService, public router: Router) {
  }

  ngOnInit() {
    this.dataService.getData('https://api.myjson.com/bins/zyhd0').subscribe(
      data => {
        console.log(data);
        this.teacherList = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  public toogleSelected(teacher) {
    window.location.href = 'staff/period/selection/' + teacher.name;
  }
}
