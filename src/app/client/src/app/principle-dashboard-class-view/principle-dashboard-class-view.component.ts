import { Component, OnInit } from '@angular/core';
import {SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, CARD_ANIMATION, APPEAR_SIDE} from '../theme/app-animations';
import {DataService} from './../staff/service/data.service';
import {map, mergeMap} from 'rxjs/operators';
import * as _ from "lodash";

@Component({
  selector: 'app-principle-dashboard-class-view',
  templateUrl: './principle-dashboard-class-view.component.html',
  styleUrls: ['./principle-dashboard-class-view.component.scss'],
  animations: [SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, CARD_ANIMATION, APPEAR_SIDE]
})
export class PrincipleDashboardClassViewComponent implements OnInit {

  constructor(private dataService: DataService,) { }
  timeTable = [];
  periodToProfileMap = {};
  ngOnInit() {
    this.populateTimeTable("09");
  }
  handleClassChange(event){
    console.log("class", event.target.value);
    this.populateTimeTable(event.target.value);
  }
  getProfileData(){
    const body = {
      "request": {
          "filters": {
            "objectType":"Teacher",
            "identifier": ["T1", "T2","T3", "T4", "T5","T6"],
            "status": []
          }
      }
    };
    return this.dataService.post('https://devcon.sunbirded.org/action/composite/v3/search', body, { headers: {'Content-Type': 'application/json'}}).pipe(map((data: any) => {
      _.forEach(data.result.Teacher, (profile) => {
        _.forEach(profile.periods, (period) => {
          this.periodToProfileMap[period] = profile;
        });
      });
      return data.result.Teacher;
    }))
  }
  getTimeTableForClass(classId){
    const date = new Date();
    const day = date.getDate();
    const month = "0" + (date.getMonth() + 1);
    return this.dataService.post('https://devcon.sunbirded.org/action/composite/v3/search', {
      'request': {
        'filters': {
          'objectType': 'Period',
          'sessionId': {
            'startsWith': classId + month + day
          },
          'status': []
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        // tslint:disable-next-line:max-line-length
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyZWU4YTgxNDNiZWE0NDU4YjQxMjcyNTU5ZDBhNTczMiJ9.7m4mIUaiPwh_o9cvJuyZuGrOdkfh0Nm0E_25Cl21kxE'
      }
    }).pipe(map((res: any) => {
      return res.result.Period;
    }))
  }
  populateTimeTable(classId) {
    this.getProfileData().pipe(mergeMap((profileData) => {
      console.log("==profileData==", profileData);
      return this.getTimeTableForClass(classId)
    }))
    .subscribe(data => {
      this.timeTable = data;
      console.log("class period data", data);
    });
  }
}
