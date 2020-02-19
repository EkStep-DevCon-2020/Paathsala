import {Component, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';
import {Router} from '@angular/router';
import {SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, CARD_ANIMATION, APPEAR_SIDE} from '../../../theme/app-animations';
import { ConfigService } from '../../../config/config.service';

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

  constructor(private dataService: DataService, public router: Router, public configService: ConfigService) {
    if(!this.configService.userInfo){
      this.router.navigate(['staff']);
    }
  }

  ngOnInit() {
    const body = {
      "request": {
          "filters": {
            "objectType":"Teacher",
            "identifier": ["T1", "T2","T3", "T4", "T5","T6"],
            "status": []
          }
      }
  };
    this.dataService.post('https://devcon.sunbirded.org/action/composite/v3/search', body, { headers: {'Content-Type': 'application/json'}})
    .subscribe((data: any) => {
        console.log(data);
        this.dataService.setTeacherData(data.result.Teacher);
        this.teacherList = data.result.Teacher;
      },
      error => {
        console.log(error);
      }
    );
  }

  public toogleSelected(teacher) {
    this.router.navigate(['staff/period/selection/' + teacher.identifier]);
  }
}
