import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../staff/service/data.service';
import {SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, CARD_ANIMATION, APPEAR_SIDE} from '../theme/app-animations';

@Component({
  selector: 'app-principle-dashboard-teacher-view',
  templateUrl: './principle-dashboard-teacher-view.component.html',
  styleUrls: ['./principle-dashboard-teacher-view.component.scss'],
  animations: [SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, CARD_ANIMATION, APPEAR_SIDE]
})
export class PrincipleDashboardTeacherViewComponent implements OnInit {
  public defaultProfileImg = './assets/images/default-profile.png';
  public teacherList;
  constructor(private dataService: DataService, public router: Router) { }

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
        this.teacherList = data.result.Teacher;
        if (this.teacherList.length > 0 ){
          // this.teacherList[0].selected = true;
          this.toggleSelected(this.teacherList[0]);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public toggleSelected(teacher) {
    this.teacherList.map( t => {
      t.selected = false;
    });
    console.log(teacher);
    teacher.selected = !teacher.selected;
  }

}
