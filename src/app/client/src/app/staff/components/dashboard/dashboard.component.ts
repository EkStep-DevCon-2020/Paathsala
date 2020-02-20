import {Component, OnInit, AfterViewInit} from '@angular/core';
import {SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, CARD_ANIMATION, APPEAR_SIDE} from '../../../theme/app-animations';
import {map} from 'rxjs/operators';
import {DataService} from '../../service/data.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ToasterService} from '@sunbird/shared';
import {forkJoin, observable} from 'rxjs';
import {ConfigService} from '../../../config/config.service';
import {trigger, state, style, animate, transition} from '@angular/animations';
import { TelemetryService } from '../../../telemetry/telemetry.service';

const ClassMap =  {
  '01' : 'Class 1',
  '02' : 'Class 2',
  '03' : 'Class 3',
  '04' : 'Class 4',
  '05' : 'Class 5',
  '06' : 'Class 6',
  '07' : 'Class 7',
  '08' : 'Class 8',
  '09' : 'Class 9',
  '10' : 'Class 10',
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, APPEAR_SIDE, CARD_ANIMATION,
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-360deg)' })),
      transition('default => rotated', animate('1500ms ease-in'))
  ])
  ]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  teacherProfile: any;
  queryParam: any;
  timeTable: any;
  loggedIn = false;
  attendenceList: any;
  assessmentScore: any;
  state = 'default';
  state2 = 'default';
  public classname: any;
  showCompletionPopUp = false;
  constructor(private dataService: DataService, public activatedRoute: ActivatedRoute, public router: Router,
              public toasterService: ToasterService, public configService: ConfigService, public telemetryServcie: TelemetryService) {
                if (this.configService.userInfo) {
                  this.loggedIn = true;
                  console.log('===user loggedin in constructor=====', this.configService.userInfo, this.configService.teacherInfo);
                } else if (this.activatedRoute.snapshot.params.sessionId) {
                  this.router.navigate(['/staff']);
                }
  }

  handleLogin() {
    this.loggedIn = true;
    console.log('===user loggedin event=====', this.configService.userInfo, this.configService.teacherInfo);
    if (!this.activatedRoute.snapshot.params.sessionId) {
      console.log('---------------------');
      this.getProfile(this.configService.userInfo.code);
    }
  }
  ngOnInit() {
    if (!this.loggedIn) {
      console.log('not logged in returning in ngoninit');
      return;
    }
  }
  getProfile(qrCode){
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
        // this.teacherList = data.result.Teacher;
        this.populateData(qrCode)
      },
      error => {
        console.log(error);
      }
    );
  }
  ngAfterViewInit(): void {
    if (this.activatedRoute.snapshot.params.sessionId) {
      console.log(this.activatedRoute.snapshot.params.sessionId);
    this.teacherProfile = {
      sessionId: this.activatedRoute.snapshot.params.sessionId
    };
    this.configService.teacherInfo.periods.forEach(element => {
      if (element.sessionId === this.activatedRoute.snapshot.params.sessionId) {
        this.teacherProfile = {
          sessionId: this.activatedRoute.snapshot.params.sessionId,
          subject: element.subject,
          topicId: element.topicId,
          topicName: element.topicName,
          identifier: element.identifier,
          name: this.configService.teacherInfo.name,
          avatar: this.configService.teacherInfo.avatar
        };
      }
    });
      this.setDashboardData(this.teacherProfile.sessionId);
      const sessionIdArray = this.activatedRoute.snapshot.params.sessionId.match(/.{1,2}/g);
      const sessionIdMap = {
        class: sessionIdArray[0]
      };
      this.classname = `${ClassMap[sessionIdMap.class]}`;
    } else if(this.configService.userInfo && this.configService.userInfo.code) {
      this.getProfile(this.configService.userInfo.code);
    }
  }
  completeTopic(done){
    console.log("Log topic complete event", this.teacherProfile, this.configService.userInfo);
    const sessionIdArray = this.teacherProfile.sessionId.match(/.{1,2}/g);
    const sessionIdMap = {
      class: sessionIdArray[0],
      month: parseInt(sessionIdArray[1]),
      day: parseInt(sessionIdArray[2]),
      hour: parseInt(sessionIdArray[3])
    }
    this.telemetryServcie.topicComplete(
    {topicId: this.teacherProfile.topicId, topicName: this.teacherProfile.topicName, subject: this.teacherProfile.subject, class: ClassMap[sessionIdMap.class], done}, 
    this.configService.userInfo.osid,
    this.teacherProfile.teacherId, this.teacherProfile.teacherName);
  }
  populateData(qrCode) {
    this.fetchData(qrCode).subscribe(data => {
      console.log(data);
      this.teacherProfile = data;
      this.getTimeTable(this.teacherProfile.sessionId).subscribe((periods: any) => {
        console.log('timetable data', periods);
        this.timeTable = periods;
        periods.forEach(element => {
          if (element.sessionId === this.teacherProfile.sessionId) {
            console.log("====found data========", element);
            this.teacherProfile = {
              sessionId: this.teacherProfile.sessionId,
              subject: element.subject,
              topicId: element.topicId,
              topicName: element.topicName,
              identifier: element.identifier
            };
          }
        });
        this.setDashboardData(this.teacherProfile.sessionId);
        const sessionIdArray = this.teacherProfile.sessionId.match(/.{1,2}/g);
        const sessionIdMap = {
          class: sessionIdArray[0]
        };
        this.classname = `${ClassMap[sessionIdMap.class]}`;
      }, error => {
        this.toasterService.error('Error Loading data Please try again Later');
        console.log('timetable fetching', error);
      });
    }, error => {
      this.toasterService.error('Error Loading data Please try again Later');
      console.log('fetchData error', error);
    });
  }

  fetchData(qrCode) {
    return this.dataService.getData('https://devcon.sunbirded.org/api/teacher/v3/user/profile/' + qrCode, {
      headers: {
        'Content-Type': 'application/json',
        // tslint:disable-next-line:max-line-length
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyZWU4YTgxNDNiZWE0NDU4YjQxMjcyNTU5ZDBhNTczMiJ9.7m4mIUaiPwh_o9cvJuyZuGrOdkfh0Nm0E_25Cl21kxE'
      }
    }).pipe(map(response => {
      return response.result.teacher;
    }));
  }

  getTimeTable(sessionId) {
    const sessionStartTime = sessionId.slice(0, -2);
    return this.dataService.post('https://devcon.sunbirded.org/action/composite/v3/search', {
      'request': {
        'filters': {
          'objectType': 'Period',
          'sessionId': {
            'startsWith': sessionStartTime
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
    }));
  }

  getAttendence(sessionId) {
    return this.dataService.getData('https://devcon.sunbirded.org/api/period/v3/attendance/' + sessionId, {
      headers: {
        'Content-Type': 'application/json',
        // tslint:disable-next-line:max-line-length
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyZWU4YTgxNDNiZWE0NDU4YjQxMjcyNTU5ZDBhNTczMiJ9.7m4mIUaiPwh_o9cvJuyZuGrOdkfh0Nm0E_25Cl21kxE'
      }
    }).pipe(map((res: any) => {
      return res || [];
    }));
  }

  getAssessmentScore(sessionId) {
    return this.dataService.getData('https://devcon.sunbirded.org/api/period/v3/assessment/' + sessionId, {
      headers: {
        'Content-Type': 'application/json',
        // tslint:disable-next-line:max-line-length
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyZWU4YTgxNDNiZWE0NDU4YjQxMjcyNTU5ZDBhNTczMiJ9.7m4mIUaiPwh_o9cvJuyZuGrOdkfh0Nm0E_25Cl21kxE'
      }
    }).pipe(map((res: any) => {
      return res || [];
    }));
  }

  setDashboardData(sessionId) {
    const requests = [];
    let timetableData: any;
    requests.push(this.getAttendence(sessionId));
    requests.push(this.getTimeTable(sessionId));
    requests.push(this.getAssessmentScore(sessionId));
    forkJoin(requests).subscribe(data => {
      console.log(data[0]);
      this.attendenceList = data[0];
      timetableData = data[1];
      this.assessmentScore = data[2];
      const teacherList = this.dataService.getTeacherData();
      timetableData.forEach((periodData, index) => {
        const hour = parseInt(periodData.sessionId.slice(-2));
        timetableData[index].startTime = hour;
        timetableData[index].endTime = hour + 1;
        teacherList.forEach(teacherData => {
          if (teacherData.periods.indexOf(periodData.identifier) !== -1) {
            timetableData[index].name = teacherData.name;
            timetableData[index].avatar = teacherData.avatar;
          }
        });
      });
      timetableData.sort(this.getSortOrder('startTime'));
      this.timeTable = timetableData;
    }, error => {
      this.toasterService.error('Error Loading data Please try again Later');
      console.log('fetchData error', error);
    });
  }

  getSortOrder(prop) {
    return (a, b) => {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }
  redirectToToc() {
    // this.teacherProfile.sessionId
    if(this.configService.contentCompleted){
      console.log("show popup");
      this.showCompletionPopUp = true;
      return;
    }
    let contentId;
    this.getTimeTable(this.teacherProfile.sessionId).subscribe((periods: any) => {
      periods.forEach(period => {
        if (period.sessionId === this.teacherProfile.sessionId) {
          contentId = period.textBookId;
        }
      });
      this.router.navigate(['play/collection/' + contentId]).then(data => {
        this.configService.contentCompleted = true;
      });
    }, error => {
      this.toasterService.error('Error Loading data Please try again Later');
      console.log('timetable fetching', error);
    });
  }

  public refreshAttendee() {
    this.state = 'rotated';
    this.getAttendence(this.teacherProfile.sessionId).subscribe(data => {
      this.attendenceList = data;
    });
    setTimeout(() => {
      this.state = 'default';
    }, 1500);
  }

  public refreshAssessment() {
    this.state2 = 'rotated';
    this.getAssessmentScore(this.teacherProfile.sessionId).subscribe(data => {
      this.assessmentScore = data;
    });
    setTimeout(() => {
      this.state2 = 'default';
    }, 1500);
  }
}
