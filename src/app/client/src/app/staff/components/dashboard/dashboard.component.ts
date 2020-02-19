import {Component, OnInit} from '@angular/core';
import {SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, CARD_ANIMATION, APPEAR_SIDE} from '../../../theme/app-animations';
import {map} from 'rxjs/operators';
import {DataService} from '../../service/data.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ToasterService} from '@sunbird/shared';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, APPEAR_SIDE, CARD_ANIMATION
  ]
})
export class DashboardComponent implements OnInit {
  teacherProfile: any;
  queryParam: any;
  timeTable: any;

  public qrcode: any = '';
  public showPopup = true;

  constructor(private dataService: DataService, public activatedRoute: ActivatedRoute,
              public toasterService: ToasterService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.qrcode = params['qrcode'] ? params['qrcode'] : '';
      if (this.qrcode) {
        this.showPopup = false;
      }
      console.log(this.qrcode);
    });
  }

  ngOnInit() {
    this.fetchData(this.activatedRoute.snapshot.params.qrCode).subscribe(data => {
      console.log(data);
      this.teacherProfile = data;
      this.getTimeTable(this.teacherProfile.sessionId).subscribe((periods: any) => {
        console.log('timetable data', periods);
        this.timeTable = periods;
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

  closePopup() {
    this.showPopup = false;
  }

}
